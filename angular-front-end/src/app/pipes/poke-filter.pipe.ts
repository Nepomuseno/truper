import { Pipe, PipeTransform } from "@angular/core";
import { Pokemon } from "../interfaces/pokemon";

@Pipe({
  name: "pokeFilter",
})
export class PokeFilterPipe implements PipeTransform {
  transform(pokemons: Pokemon[], term: string): Pokemon[] {
    if (term === "") {
      return pokemons;
    }
    return pokemons.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(term.toLowerCase()));
  }
}
