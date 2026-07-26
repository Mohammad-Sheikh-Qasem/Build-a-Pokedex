# Pokedex CLI

A REPL-based command-line Pokedex built with **Node.js** and **TypeScript**. It talks to the public [PokeAPI](https://pokeapi.co/) to browse location areas, explore them for wild Pokémon, "catch" Pokémon with a probability based on their base experience, and inspect the ones you've caught — all from an interactive terminal prompt.

---

## 📑 Table of Contents

- [Overview](#overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [Commands Reference](#-commands-reference)
- [Example Session](#-example-session)
- [How It Works](#-how-it-works)
- [Testing](#-testing)
- [License](#-license)

---

## Overview

This project implements a REPL (Read-Eval-Print Loop) that simulates a Pokedex device. Each command you type is parsed and dispatched to a handler that talks to PokeAPI, with an in-memory cache layer to avoid redundant network requests. Caught Pokémon are kept in memory for the duration of the session and can be inspected in detail.

---

## 🚀 Features

- **Interactive REPL** built on Node's built-in `readline` module.
- **Paginated location browsing** — move forward and backward through PokeAPI's location-area list.
- **Location exploration** — list the wild Pokémon encountered in a given location area.
- **Catch mechanic** — catch chance is calculated as `100 - base_experience / 2`, so tougher Pokémon are harder to catch.
- **Pokémon inspection** — view height, weight, base stats, and types of any Pokémon you've caught.
- **Personal Pokedex** — track and list every Pokémon you've successfully caught this session.
- **Response caching** with automatic expiration (reaping) to reduce repeated calls to PokeAPI.
- **Built-in help command** listing all available commands and their descriptions.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [TypeScript](https://www.typescriptlang.org/) | Primary programming language |
| [Node.js](https://nodejs.org/) | Runtime environment |
| `readline` (Node built-in) | Interactive REPL interface |
| [PokeAPI](https://pokeapi.co/) | Source of all Pokémon and location data |
| `vitest` | Test runner |

---

## 📂 Project Structure

```
Build-a-Pokedex/
├── src/
│   ├── main.ts               # Entry point — initializes state and starts the REPL
│   ├── repl.ts                # REPL loop: reads input, parses it, dispatches commands
│   ├── repl.test.ts           # Unit tests for input parsing
│   ├── state.ts               # Shared application state (commands, cache, pokedex, pagination)
│   ├── commands.ts            # Command registry (maps command names to handlers)
│   ├── command_help.ts        # `help` command
│   ├── command_exit.ts        # `exit` command
│   ├── command_map.ts         # `map` command (next page of locations)
│   ├── command_mapb.ts        # `mapb` command (previous page of locations)
│   ├── command_explore.ts     # `explore` command
│   ├── command_catch.ts       # `catch` command
│   ├── command_inspect.ts     # `inspect` command
│   ├── command_pokedex.ts     # `pokedex` command
│   ├── pokeapi.ts             # PokeAPI HTTP client (locations, location details, Pokémon)
│   └── pokecache.ts           # In-memory cache with time-based expiration
├── tsconfig.json
└── package.json
```

---

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm (bundled with Node.js)
- An internet connection (the app fetches live data from PokeAPI)

---

## 📦 Installation & Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Mohammad-Sheikh-Qasem/Build-a-Pokedex.git
cd Build-a-Pokedex
```

2. **Install dependencies:**

```bash
npm install
```

---

## 🏃 Running the Application

| Command | Description |
|---|---|
| `npm run build` | Compiles TypeScript into JavaScript in `dist/` |
| `npm run dev` | Compiles and runs the REPL directly (good for development) |
| `npm start` | Runs the app from the pre-built files (`dist/main.js`) |
| `npm test` | Runs the test suite with Vitest |

Once started, you'll see the interactive prompt:

```
Pokedex >
```

Type a command name (optionally followed by arguments) and press Enter.

---

## 📖 Commands Reference

| Command | Arguments | Description |
|---|---|---|
| `help` | — | Displays a list of all available commands and their descriptions |
| `map` | — | Shows the next 20 location areas |
| `mapb` | — | Shows the previous 20 location areas |
| `explore` | `<location-name>` | Lists the Pokémon that can be encountered in a given location area |
| `catch` | `<pokemon-name>` | Attempts to catch the given Pokémon; success chance depends on its base experience |
| `inspect` | `<pokemon-name>` | Shows details (height, weight, stats, types) of a Pokémon you've already caught |
| `pokedex` | — | Lists all Pokémon you've caught so far |
| `exit` | — | Closes the REPL and exits the program |

---

## 💻 Example Session

```
Pokedex > map
canalave-city-area
eterna-city-area
pastoria-city-area
...

Pokedex > explore pastoria-city-area
Exploring pastoria-city-area...
Found Pokemon:
 - tentacool
 - tentacruel
 - staryu
 ...

Pokedex > catch tentacool
Throwing a Pokeball at tentacool...
tentacool was caught!

Pokedex > inspect tentacool
Name: tentacool
Height: 9
Weight: 455
Stats:
  -hp: 40
  -attack: 40
  ...
Types:
  - water
  - poison

Pokedex > pokedex
Your Pokedex:
 - tentacool

Pokedex > exit
Closing the Pokedex... Goodbye!
```

---

## ⚙️ How It Works

1. **`main.ts`** builds the initial `State` (readline interface, command registry, cache, PokeAPI client, empty pokedex, pagination cursors) and starts the REPL.
2. **`repl.ts`** listens for each line of input, lowercases and splits it into words, looks up the first word in the command registry, and invokes the matching handler with the rest as arguments.
3. Each **command handler** (`command_*.ts`) implements one REPL command and reads/writes the shared `State` object as needed (e.g. updating pagination URLs or adding a caught Pokémon to the pokedex).
4. **`pokeapi.ts`** wraps all HTTP calls to PokeAPI (`fetchLocations`, `fetchLocation`, `fetchPokemon`), checking the cache before making a network request and storing new results back into it.
5. **`pokecache.ts`** implements a simple in-memory `Map`-based cache with a background "reap" loop that periodically evicts entries older than the configured interval (60 seconds by default).

---

## 🧪 Testing

The project includes unit tests (e.g. for input parsing in `repl.test.ts`) using **Vitest**. To run them:

```bash
npm test
```

---

## 📄 License

This project is licensed under the **ISC** license.
