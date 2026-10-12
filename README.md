# next.js playground

a sandbox for experimenting with [next.js](https://nextjs.org), currently on Next.js 16.4 and React 19.3.

live over at [https://next-15-weld.vercel.app/](https://next-15-weld.vercel.app/)

## what is this?

this project is a living lab for next.js and react features. it includes:

- realtime chat w [convex](https://convex.dev)
- app router, rsc + streaming, actions
- sanity integration for blog, ISR, PPR through Cache Components
- React view transitions
- a mini golf ⛳️ game using three.js + fiber + drei + rapier
- react compiler for mini golf components
- comments page w [convex](https://convex.dev)


## getting Started

Use Node.js 22.12+ and pnpm. Copy `.env.example` to `.env.local` and set the Convex deployment URL and OMDb API key before starting the app.

```bash
pnpm install
pnpm dev
```

## checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## project skills

Official Next.js runtime verification, Cache Components adoption, bundle analysis, and React view-transition skills are installed under `.agents/skills/`. See `AGENTS.md` for their scope and source versions.
