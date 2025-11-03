export interface PokemonBasicResponse {
  count: number;
  next: null;
  previous: null;
  results: Result[];
}

interface Result {
  name: string;
  url: string;
}
