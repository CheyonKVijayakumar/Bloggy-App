# Deployment to Netlify - Fixing 404 Errors

## Steps to Complete:

### 1. Install @netlify/next Dependency
- Run `npm install @netlify/next@latest` to add the plugin for Next.js SSR/routing support on Netlify.
- Status: Complete (installed successfully, audited 933 packages)

### 2. Update netlify.toml
- Add `[[plugins]] package = "@netlify/next"` to enable the plugin.
- Status: Pending

### 3. Test Local Build
- Run `npm run build` to generate .next and check for errors.
- Run `npm run start` to test production server at http://localhost:3000 (verify no 404s on /dashboard, /projects/[id]).
- Status: Pending

### 4. Set Environment Variables in Netlify
- In Netlify dashboard (Site settings > Environment variables), add vars from local .env (e.g., FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_PROJECT_ID).
- Status: Pending (Manual)

### 5. Deploy with Netlify CLI
- Install CLI: `npm install -g netlify-cli`
- Login: `netlify login`
- Deploy: `npm run build && netlify deploy --prod --dir=.next`
- Check deploy logs for errors.
- Status: Pending

### 6. Verify Deployment
- Access deployed site URL (e.g., effervescent-babousa-2b4.netlify.app).
- Test root (/), /dashboard, /dashboard/projects/[id] (replace [id] with a sample).
- Check Netlify Functions tab for deployed functions.
- If 404 persists, review logs and adjust.
- Status: Pending

After all steps, remove this file or mark as complete.
