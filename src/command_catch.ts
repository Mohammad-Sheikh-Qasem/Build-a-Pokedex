import type { State } from "./state.js";


export async function commandCatch(
  state: State,
  ...args: string[]
): Promise<void> {

  if (args.length === 0) {
    console.log("Please provide a Pokemon name");
    return;
  }


  const pokemonName = args[0];


  console.log(
    `Throwing a Pokeball at ${pokemonName}...`
  );


  const pokemon =
    await state.pokeapi.fetchPokemon(pokemonName);


  const chance =
    100 / pokemon.base_experience;


  if (Math.random() * 100 < chance) {

    console.log(
      `${pokemonName} was caught!`
    );

    state.pokedex[pokemonName] = pokemon;

  } else {

    console.log(
      `${pokemonName} escaped!`
    );
  }
}
