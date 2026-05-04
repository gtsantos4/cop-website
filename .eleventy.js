const { parse } = require("node-html-parser");
const fs = require("fs");
const path = require("path");

module.exports = function(eleventyConfig) {
  // Static asset passthrough — files copied into _site as-is.
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("cop-photos");
  eleventyConfig.addPassthroughCopy("colors_and_type.css");
  // The constellation is a self-contained interactive — exclude it from
  // template processing in .eleventyignore and pass it through verbatim.
  eleventyConfig.addPassthroughCopy("constellation.html");

  // Watch CSS + search assets so dev server reloads on change.
  eleventyConfig.addWatchTarget("assets/site.css");
  eleventyConfig.addWatchTarget("assets/search.js");

  // ---------- Auto-mark editable text ----------
  // For pages with `editPage` frontmatter, walk the body and add
  // data-field="f-N" to every text-leaf element. The boss can then click
  // any text in edit mode and the inline-edit worker knows where to
  // commit the change.
  //
  // Skips: shared chrome (header/nav/footer), script/style/svg, the edit
  // toolbar itself, and elements that already have data-field.
  //
  // Marks: any element whose direct children are only text or simple
  // inline tags (br/strong/em/span/a/code/b/i/u/small/sub/sup).
  eleventyConfig.addTransform("auto-edit-markers", function(content, outputPath) {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    if (!/<body[^>]*\bdata-edit-page=/.test(content)) return content;

    const root = parse(content, { comment: true });
    const body = root.querySelector("body");
    if (!body) return content;

    const SKIP_TAGS = new Set(["script","style","noscript","svg","header","nav","footer","template"]);
    const SKIP_IDS = new Set(["edit-bar"]);
    const INLINE_OK = new Set(["br","strong","em","span","a","code","b","i","u","small","sub","sup","mark","abbr","time"]);

    let counter = 0;

    function isTextLeaf(el) {
      let hasNonWhitespace = false;
      for (const child of el.childNodes) {
        if (child.nodeType === 3) {
          if ((child.rawText || "").trim()) hasNonWhitespace = true;
          continue;
        }
        if (child.nodeType !== 1) continue;
        const t = (child.rawTagName || "").toLowerCase();
        if (!INLINE_OK.has(t)) return false;
      }
      return hasNonWhitespace;
    }

    function walk(el) {
      const tag = (el.rawTagName || "").toLowerCase();
      if (SKIP_TAGS.has(tag)) return;
      if (el.id && SKIP_IDS.has(el.id)) return;

      if (tag && isTextLeaf(el) && !el.hasAttribute("data-field")) {
        counter++;
        el.setAttribute("data-field", `f-${counter}`);
        return; // text leaves don't have block children worth walking
      }

      for (const child of el.childNodes) {
        if (child.nodeType === 1) walk(child);
      }
    }

    walk(body);

    // ---------- Apply edit overrides from sidecar ----------
    // Read edits/<page>.json (written by the inline-edit worker) and
    // overwrite the inner content of any data-field elements that have an
    // override. This is what makes edits survive every rebuild.
    const editPage = body.getAttribute("data-edit-page");
    if (editPage) {
      const slug = editPage.replace(/\.html$/, "");
      const sidecar = path.join(__dirname, "edits", `${slug}.json`);
      if (fs.existsSync(sidecar)) {
        try {
          const overrides = JSON.parse(fs.readFileSync(sidecar, "utf8"));
          for (const [field, text] of Object.entries(overrides)) {
            const el = root.querySelector(`[data-field="${field}"]`);
            if (!el) continue;
            const safe = String(text)
              .replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;");
            el.set_content(safe);
          }
        } catch (err) {
          console.warn(`[auto-edit-markers] failed to apply ${sidecar}: ${err.message}`);
        }
      }
    }

    return root.toString();
  });

  eleventyConfig.addWatchTarget("edits/");

  // Strip HTML for the build-time search index. Removes script/style blocks,
  // tags, comments, and decodes a few common entities. Good enough for a
  // small site; no need for a real HTML parser.
  eleventyConfig.addFilter("striphtml", function(content) {
    if (!content) return "";
    return String(content)
      .replace(/<(script|style)\b[^<]*(?:(?!<\/\1>)<[^<]*)*<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&[a-z]+;/gi, " ")
      .replace(/\s+/g, " ")
      .trim();
  });


  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    templateFormats: ["html", "njk", "md"]
  };
};
