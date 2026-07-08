import type { State } from "./state.js";

export async function commandPokedex(
  state: State
): Promise<void> {

  console.log("Your Pokedex:");

  for (const pokemonName in state.pokedex) {
    console.log(` - ${pokemonName}`);
  }
}
