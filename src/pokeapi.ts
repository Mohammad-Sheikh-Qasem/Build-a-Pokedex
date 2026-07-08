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


export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor(private cache: Cache) {}

  async fetchLocations(
    pageURL?: string,
  ): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch locations: ${response.status}`);
    }

    const data: ShallowLocations = await response.json();

    return data;
  }
async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
  const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

  const cached = this.cache.get<ShallowLocations>(url);

  if (cached) {
    return cached;
  }

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch locations`);
  }

  const data: ShallowLocations = await response.json();

  this.cache.add(url, data);

  return data;
}
}
