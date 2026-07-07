// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";

function main() {
  startREPL(process.stdin, process.stdout);
}

main();
