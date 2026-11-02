# Battleground

A position management and tracking app built with Next.js. You define operation fields on a map (an area with a type and a time window), and units moving across the map are tracked live: every new position arrives over a WebSocket, is saved to the database and redrawn on the map with the unit's path.

The UI is in Turkish.

## Features

- **Fields** (`/home/fields`): list of fields as cards with a mini map. Add one at `/home/fields/new` by entering a name, a type (Gözetleme, İzleme, Saldırı, Savunma, Keşif, Eğitim) and a start and end time, then picking its corners on a map. Fields can be removed.
- **Units** (`/home/units`): list of units with their speed and a map of their movement history. Units can be removed; new ones are added through the database.
- **Map** (`/home/map`): every field and unit on one Leaflet map. Unit paths update in real time while the simulator runs. `?focusOnField=<id>` or `?focusOnUnit=<id>` zooms to one of them.

## Stack

- Next.js 15 (App Router, server actions) and React 19
- Prisma 6 with SQLite
- Leaflet and react-leaflet for maps
- MUI 7 and MUI X date pickers, Sass modules
- `ws` for the movement simulator

## Getting started

Requires Node 20 or newer and pnpm.

```bash
pnpm install
pnpm p:generate     # generate the Prisma client into generated/prisma
pnpm dev            # http://localhost:3000
```

The repo ships with a SQLite database (`prisma/dev.db`) that already holds a few fields and units, and `.env` points `DATABASE_URL` at it, so there is nothing else to set up.

To see live tracking, start the simulator in a second terminal and open `/home/map`:

```bash
pnpm simulate
```

It runs a WebSocket server on `ws://localhost:8080` that sends a random position for the first unit (`Tank`) every second.

## Scripts

| Command           | What it does                                  |
| ----------------- | --------------------------------------------- |
| `pnpm dev`        | Dev server                                    |
| `pnpm build`      | Production build                              |
| `pnpm start`      | Serve the production build                    |
| `pnpm lint`       | Next.js ESLint                                |
| `pnpm simulate`   | WebSocket server that emits unit positions    |
| `pnpm p:generate` | Generate the Prisma client                    |
| `pnpm p:migrate`  | Create and apply a migration (`prisma migrate dev`) |
| `pnpm p:studio`   | Browse the database in Prisma Studio          |

## Project structure

```
app/
  page.tsx            redirects to /home/fields
  home/fields/        field list and the "new field" form
  home/units/         unit list
  home/map/           main map, subscribes to the WebSocket
lib/
  api/                server actions that read and write through Prisma
  components/         Bt* components (map, cards, pickers, app bar)
  consts/, utils/
prisma/
  schema.prisma       Field, Unit, UnitHistory
  migrations/
  dev.db              bundled SQLite database
simulation.mjs        WebSocket movement simulator
```

## Data model

- **Field**: name, type (enum), start and end time, and its polygon coordinates stored as a JSON string.
- **Unit**: name, speed, course and an optional field id.
- **UnitHistory**: one timestamped `lat`/`lng` point per row, linked to a unit.

## License

MIT
