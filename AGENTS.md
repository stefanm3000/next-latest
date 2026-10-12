# Project guidance

- This is a pnpm App Router playground on Next.js 16.4 and React 19.3. Preserve its PPR, view transitions, and annotation-only React Compiler behavior when changing framework configuration.
- Read version-matched documentation under `node_modules/next/dist/docs/` before relying on remembered Next.js APIs. Use the official documentation online when a page is not bundled.
- Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` for framework changes, and verify affected routes in a running app. Keep `.env.local` and credentials out of Git and tool output.

## Project skills

Official skills are installed in `.agents/skills/` from `vercel/next.js` release `v16.4.0` (commit `e273d5b2e869d0be06c0e86f788e1594f9dd40cf`):

- `next-dev-loop`: inspect the Next.js MCP endpoint and browser when verifying runtime changes.
- `next-cache-components-adoption`: preserve PPR while migrating Cache Components behavior.
- `next-bundle-optimizer`: use for a requested bundle audit or optimization, particularly the mini-golf route.

`vercel-react-view-transitions` comes from `vercel-labs/agent-skills` commit `063bee94c3f4df8453406c830b0a7df0f2860278` and covers the app's React 19.3 transition patterns.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
