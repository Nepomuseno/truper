import { pokemonApi } from "@/api/pokemonApi";
import type { Pokemon } from "@/interfaces/pokemon";
import type { PokemonBasicResponse } from "@/interfaces/pokemon-basic-response";
import type { PokemonResponse } from "@/interfaces/pokemon-response";

const CACHE_KEY = "pokemons-react";
const CACHE_TIME_KEY = "pokemons-cache-timestamp";
const CACHE_DURATION_MINUTES = 1;

export const getBasicPokemonAction = async (): Promise<PokemonBasicResponse> => {
  try {
    const { data } = await pokemonApi.get<PokemonBasicResponse>("?limit=100000&offset=0.");
    return data as PokemonBasicResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDataPokemonsAction = async () => {
  try {
    const stored = localStorage.getItem(CACHE_KEY);
    const timestamp = localStorage.getItem(CACHE_TIME_KEY);
    const now = Date.now();

    if (stored && timestamp) {
      const diffMinutes = (now - parseInt(timestamp)) / 1000 / 60;

      if (diffMinutes < CACHE_DURATION_MINUTES) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          console.log(` Usando cache local (${Math.round(diffMinutes * 60)} seg)`);
          return parsed;
        }
      } else {
        console.log("Cache vencido, se recargará desde la API");
      }
    }

    // 🌐 Cargar desde API si no hay cache o ya venció
    const data = await getBasicPokemonAction();
    const urls = data?.results.map((pokemon) => pokemon.url);

    const pokemons = await Promise.all(
      urls.map(async (url: string) => {
        const id = url.split("/")[6];
        const { data } = await pokemonApi.get<PokemonResponse>(`/${id}`);
        return buildPokemon(data);
      })
    );

    setLocalStorage(pokemons);
    return pokemons;
  } catch (error) {
    console.error("❌ Error al obtener pokemons:", error);
    return [];
  }
};

const buildPokemon = (pokemon: PokemonResponse): Pokemon => ({
  id: pokemon.id,
  name: pokemon.name,
  weight: pokemon.weight,
  height: pokemon.height,
  sprite: {
    back: pokemon.sprites.back_default || "",
    front: pokemon.sprites.front_default || "",
  },
  moves: pokemon.moves.map((move) => move.move.name),
});

const setLocalStorage = (pokemons: Pokemon[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(pokemons));
  localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
};
