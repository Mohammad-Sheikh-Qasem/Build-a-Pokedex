import { Cache } from "./pokecache.js";
import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;

  pokeapi: PokeAPI;
  cache: Cache;

  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const cache = new Cache(60000);

  return {
    rl,
    commands: getCommands(),

    cache,

    pokeapi: new PokeAPI(cache),

    nextLocationsURL: null,
    prevLocationsURL: null,
  };
}
