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

  constructor() {}

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

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(
      `${PokeAPI.baseURL}/location-area/${locationName}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch location`);
    }

    return await response.json();
  }
}
