import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { PokemonBasicResponse } from "../interfaces/pokemon-basic-response";
import { PokemonResponse } from "../interfaces/pokemon-response";
import { Pokemon } from "../interfaces/pokemon";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  http = inject(HttpClient);
  api_url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.";
  allPokemons = signal<Pokemon[]>([]);
  loading = signal<boolean>(false);

  constructor() {
    this.getAllPokemons();
  }

  async getAllPokemonsBasic() {
    try {
      const dataObservable = this.http.get<PokemonBasicResponse>(this.api_url);
      const data = await lastValueFrom(dataObservable);
      const urlBasic = data?.results.map((pokemon) => pokemon.url);
      if (urlBasic) {
        return urlBasic;
      } else {
        return [];
      }
    } catch (error) {
      return [];
    }
  }

  async getAllPokemons() {
    try {
      this.loading.set(true);
      const urlBasics = await this.getAllPokemonsBasic();
      const Pokemons = await Promise.all(
        urlBasics.slice(0, 10).map(async (url: string) => {
          const resp = this.http.get<PokemonResponse>(url);
          const pokemon = await lastValueFrom(resp);
          const pokeData: Pokemon = this.buildPokemon(pokemon);
          return pokeData;
        })
      );
      this.allPokemons.set(Pokemons);
      this.loading.set(false);
      localStorage.setItem("pokemons", JSON.stringify(this.allPokemons()));
    } catch (error) {
      this.loading.set(false);
      localStorage.setItem("pokemons", JSON.stringify([]));
    }
  }

  private buildPokemon(pokemon: PokemonResponse): Pokemon {
    const pokeData: Pokemon = {
      id: pokemon.id,
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      sprite: {
        back: pokemon.sprites.back_default || "",
        front: pokemon.sprites.front_default || "",
      },
      moves: pokemon.moves.map((move) => move.move.name),
    };
    return pokeData;
  }

  deletePokemon(id: number) {
    const pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const seach = pokemons.filter((pokemon: Pokemon) => pokemon.id !== +id);
    this.allPokemons.set(seach);
    localStorage.setItem("pokemons", JSON.stringify(this.allPokemons()));
  }

  getOnePokemnon(ids: number[]) {
    const pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    this.allPokemons.set(pokemons);
    const selectedPokemons = this.allPokemons().filter((p) => ids.includes(p.id));
    return selectedPokemons;
  }
}
