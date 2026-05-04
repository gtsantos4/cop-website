// CoP inline-edit worker
// Receives POST /save {field, text, page} from a published page and writes
// the edit to two places, in one round-trip each:
//   1. edits/<page>.json — sidecar dict {field: text}, source of truth.
//      The Eleventy build transform reads this and applies overrides on
//      every rebuild so edits never get clobbered.
//   2. docs/<page>.html — patched in place so other viewers see the change
//      before Pages redeploys.

const PAGE_PATTERN = /^[a-zA-Z0-9_-]+\.html$/;

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors() });
    }

    const url = new URL(request.url);
    if (url.pathname !== "/save" || request.method !== "POST") {
      return json({ error: "not found" }, 404);
    }

    let body;
    try { body = await request.json(); }
    catch { return json({ error: "invalid json" }, 400); }

    const { field, text, page } = body || {};
    if (!field || typeof text !== "string" || !page) {
      return json({ error: "missing field/text/page" }, 400);
    }
    if (!PAGE_PATTERN.test(page)) {
      return json({ error: `invalid page: ${page}` }, 400);
    }
    if (text.length > 50000) {
      return json({ error: "text too long" }, 413);
    }
    if (!/^[a-zA-Z0-9._-]+$/.test(field)) {
      return json({ error: "invalid field name" }, 400);
    }

    try {
      const sidecarChanged = await updateSidecar(env, page, field, text);
      const builtChanged = await updateBuiltHtml(env, page, field, text);
      if (!sidecarChanged && !builtChanged) {
        return json({ ok: true, noop: true, reason: "field not found or text unchanged" });
      }
      return json({ ok: true });
    } catch (err) {
      return json({ error: String(err.message || err) }, 500);
    }
  },
};

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors() },
  });
}

// Update the sidecar JSON for a page. Creates the file if missing.
async function updateSidecar(env, page, field, text) {
  const slug = page.replace(/\.html$/, "");
  const path = `edits/${slug}.json`;
  const fileUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;

  let existing = {};
  let sha = undefined;

  const getResp = await fetch(fileUrl, { headers: ghHeaders(env) });
  if (getResp.ok) {
    const meta = await getResp.json();
    sha = meta.sha;
    try {
      existing = JSON.parse(b64decodeUtf8(meta.content.replace(/\s/g, "")));
    } catch { /* malformed sidecar — overwrite */ }
  } else if (getResp.status !== 404) {
    throw new Error(`GET ${path} → ${getResp.status}`);
  }

  if (existing[field] === text) return false;
  existing[field] = text;

  const putBody = {
    message: `inline-edit: ${page} · ${field}`,
    content: b64encodeUtf8(JSON.stringify(existing, null, 2) + "\n"),
    committer: { name: "CoP edit bot", email: "edit-bot@cityofpromise.local" },
  };
  if (sha) putBody.sha = sha;

  const putResp = await fetch(fileUrl, {
    method: "PUT",
    headers: ghHeaders(env),
    body: JSON.stringify(putBody),
  });
  if (!putResp.ok) {
    const t = await putResp.text();
    throw new Error(`PUT ${path} → ${putResp.status} ${t.slice(0, 200)}`);
  }
  return true;
}

// Patch the built docs/<page>.html in place so other viewers see the change
// before Pages republishes. If the regex doesn't match, return false (the
// sidecar still wins on next rebuild).
async function updateBuiltHtml(env, page, field, text) {
  const path = `docs/${page}`;
  const fileUrl = `https://api.github.com/repos/${env.GITHUB_REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`;

  const getResp = await fetch(fileUrl, { headers: ghHeaders(env) });
  if (getResp.status === 404) return false;
  if (!getResp.ok) throw new Error(`GET ${path} → ${getResp.status}`);
  const meta = await getResp.json();
  const html = b64decodeUtf8(meta.content.replace(/\s/g, ""));

  const newHtml = applyEdit(html, field, text);
  if (newHtml === html) return false;

  const putResp = await fetch(fileUrl, {
    method: "PUT",
    headers: ghHeaders(env),
    body: JSON.stringify({
      message: `inline-edit: ${path} · ${field}`,
      content: b64encodeUtf8(newHtml),
      sha: meta.sha,
      committer: { name: "CoP edit bot", email: "edit-bot@cityofpromise.local" },
    }),
  });
  if (!putResp.ok) {
    const t = await putResp.text();
    throw new Error(`PUT ${path} → ${putResp.status} ${t.slice(0, 200)}`);
  }
  return true;
}

function ghHeaders(env) {
  return {
    "Authorization": `Bearer ${env.GITHUB_TOKEN}`,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "cop-edit-worker",
  };
}

function applyEdit(html, field, text) {
  const safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const escField = field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(<([a-zA-Z][\\w-]*)[^>]*\\bdata-field=["']${escField}["'][^>]*>)([\\s\\S]*?)(<\\/\\2>)`
  );
  return html.replace(re, `$1${safeText}$4`);
}

function b64decodeUtf8(b64) {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(bytes);
}

function b64encodeUtf8(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}
