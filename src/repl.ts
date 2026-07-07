import readline from "readline";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL(
  input: NodeJS.ReadableStream,
  output: NodeJS.WritableStream,
) {
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

    console.log(`Your command was: ${words[0]}`);

    rl.prompt();
  });
}
