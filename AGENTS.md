# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

Battleground is a Next.js 15 (App Router) + React 19 app for drawing operation fields on a map
and tracking units' positions in real time. Prisma 6 over SQLite, Leaflet maps, MUI 7, Sass
modules. Package manager is pnpm. The UI text is Turkish. The repo is archived on GitHub.

## Commands

```bash
pnpm install
pnpm p:generate   # required before dev/build: the client is generated into generated/prisma (gitignored)
pnpm dev          # http://localhost:3000
pnpm simulate     # WebSocket server on ws://localhost:8080 sending positions for unit id 0
pnpm lint         # next lint
pnpm p:migrate    # prisma migrate dev, after editing prisma/schema.prisma
pnpm p:studio
```

There are no tests.

## Architecture

- Data access is server actions in `lib/api/` (`"use server"`), one function per file
  (`getFields`, `addField`, `removeField`, `getUnits`, `removeUnit`, `getUnitHistory`,
  `addUnitHistory`). They use the shared client from `prisma/btPrisma.ts`. Client components call
  them directly; there are no route handlers.
- Prisma types are imported from `@/generated/prisma`, not `@prisma/client`, because the schema
  sets a custom `output`.
- `/home/map` is a client component. It loads all data, then opens a WebSocket to the hard-coded
  `ws://localhost:8080`; each message (`{ timestamp, lat, lng, id }`) is written with
  `addUnitHistory` and all data is reloaded. `BtMainMap` is loaded with `dynamic(..., { ssr: false })`
  because Leaflet needs `window`; do the same for any new Leaflet component.
- `Field.coordinates` is a JSON string of `[lat, lng]` pairs, and `startTime`, `endTime`,
  `Unit.speed` and `Unit.course` are strings (see the `date_to_string` migration). Parse and
  serialize at the edges.
- `FIELD_TYPE` is a Prisma enum with Turkish values; `lib/consts/FIELD_TYPES.ts` mirrors it for
  the UI. Change both together, plus a migration.
- There is no UI for creating units. Units live in the committed `prisma/dev.db` (ids 0, 1, 2, 4).
- `.env` is committed and only points `DATABASE_URL` at `prisma/dev.db`. `SERVER_BASE_URL` and
  `lib/utils/btFetch.ts` are unused leftovers.

## Conventions

- Shared components are prefixed `Bt` and live flat in `lib/components/`, with a co-located
  `.module.scss` when they need styles.
- Path alias `@/` maps to the repo root.
- Formatting follows the Next.js defaults: double quotes, semicolons, two-space indent.
