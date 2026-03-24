# Frontend

Generated with `olympns-nextjs-workshop`.

## Start

```bash
node --version
corepack enable
yarn install
yarn dev
```

Use Node.js 20.9.0 or newer for Next.js 16.

If the project is nested inside another Yarn workspace, the generated empty `yarn.lock`
keeps it isolated as a standalone project.

## Internal generators

```bash
yarn generate:ui badge
yarn generate:fragment billing
yarn generate:page account/settings billing
```
