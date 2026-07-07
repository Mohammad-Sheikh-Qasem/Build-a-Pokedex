import readline from "readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(
  input: NodeJS.ReadableStream,
  output: NodeJS.WritableStream,
) {
  const commands = getCommands();

  const rl = readline.createInterface({
    input,
    output,
    prompt: "Pokedex > ",
  });

  rl.prompt();

  rl.on("line", (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      rl.prompt();
      return;
    }

    const command = commands[words[0]];

    if (command) {
      try {
        command.callback(commands);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unknown command");
    }

    rl.prompt();
  });
}
