import type { State } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
  state.rl.prompt();

  state.rl.on("line", async (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const command = state.commands[words[0]];

    if (command) {
      try {
        await command.callback(state);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unknown command");
    }

    state.rl.prompt();
  });
}
