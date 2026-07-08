import { Cache } from "./pokecache.js";

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  pokemon_encounters: {
    pokemon: {
      name: string;
    };
  }[];
};

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor(private cache: Cache) {}

  async fetchLocation(locationName: string): Promise<Location> {
    const url =
      `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached =
      this.cache.get<Location>(url);

    if (cached) {
      return cached;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch location");
    }

    const data: Location = await response.json();

    this.cache.add(url, data);

    return data;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url =
      pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached =
      this.cache.get<ShallowLocations>(url);

    if (cached) {
      return cached;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data: ShallowLocations =
      await response.json();

    this.cache.add(url, data);

    return data;
  }
}
