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
      const urlBasics = await this.getAllPokemonsBasic();
      const Pokemons = await Promise.all(
        urlBasics.map(async (url: string) => {
          const resp = this.http.get<PokemonResponse>(url);
          const pokemon = await lastValueFrom(resp);
          // console.log(pokemon);
          const pokeData: Pokemon = {
            id: pokemon.id,
            name: pokemon.name,
            weight: pokemon.weight,
            height: pokemon.height,
            sprite: {
              back: pokemon.sprites.back_default || "",
              front: pokemon.sprites.front_default || "",
            },
          };
          return pokeData;
        })
      );
      this.allPokemons.set(Pokemons);
      localStorage.setItem("pokemons", JSON.stringify(this.allPokemons()));
    } catch (error) {
      localStorage.setItem("pokemons", JSON.stringify([]));
    }
  }

  searchPokemnon(term: string) {
    const pokemons = JSON.parse(localStorage.getItem("pokemons") || "[]");
    const seach = pokemons.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()));
    return seach;
  }

  deletePokemon(id: string) {
    const pokemons = this.allPokemons();
    this.allPokemons.set(pokemons.filter((pokemon: Pokemon) => pokemon.id !== +id));
    localStorage.setItem("pokemons", JSON.stringify(this.allPokemons()));
  }
}
