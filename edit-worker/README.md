# cop-edit-worker

Cloudflare Worker that powers inline content editing on the published CoP site.

## How it fits

```
boss in browser  →  POST /save  →  Cloudflare Worker  →  GitHub Contents API
                                                                ↓
                                                         commit to source + docs/
                                                                ↓
                                                        GitHub Pages redeploys
                                                                ↓
                                                          live site updates
```

## Setup (one-time)

1. **Install wrangler:**
   ```sh
   cd edit-worker
   npm install
   ```

2. **Log in to Cloudflare:**
   ```sh
   npx wrangler login
   ```
   Browser opens for auth. Approve.

3. **Create a GitHub fine-grained PAT:**
   - https://github.com/settings/personal-access-tokens/new
   - Resource owner: `gtsantos4`
   - Repository access: only `cop-website`
   - Permissions → Repository → **Contents: Read and write**
   - Expiration: as long as you'd like
   - Copy the token (starts with `github_pat_…`)

4. **Set secrets on the Worker:**
   ```sh
   npx wrangler secret put GITHUB_TOKEN
   # paste the github_pat_... token

   npx wrangler secret put EDIT_PASSWORD
   # type whatever password the boss should use
   ```

5. **Deploy:**
   ```sh
   npx wrangler deploy
   ```
   Wrangler prints the deployed URL (e.g. `https://cop-edit-worker.gtsantos4.workers.dev`).
   Drop that URL into `assets/edit.js` (`SAVE_URL` constant), rebuild, push.

## Updating

```sh
npx wrangler deploy
```

## Adding a new editable page

1. Add the page filename to `ALLOWED_PAGES` in `src/index.js`.
2. Add `data-field="…"` markers and the editor toolbar in the page itself.
3. Redeploy: `npx wrangler deploy`.
