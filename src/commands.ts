import { commandExplore } from "./command_explore.js";
import type { CLICommand } from "./state.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
    explore: {
      name: "explore",
      description: "Explore a location area",
      callback: commandExplore,
    },

    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },

    map: {
      name: "map",
      description: "Displays the next 20 locations",
      callback: commandMap,
    },

    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations",
      callback: commandMapBack,
    },
  };
}
