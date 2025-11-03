import { Component, inject, model, signal, Signal } from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { Pokemon } from "../../interfaces/pokemon";

@Component({
  selector: "app-home",
  imports: [SearchBarComponent, PokemonCardComponent],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  pokeS = inject(PokemonService);
  searchTerm = model<string>("");
  seachPokemon = signal<Pokemon[]>([]);

  searchPokemon(event: string) {
    if (event === "") {
      this.pokeS.getAllPokemons();
      return;
    }
    const pokemons = this.pokeS.searchPokemnon(event);
    this.seachPokemon.set(pokemons);
  }

  get pokemons(): Signal<Pokemon[]> {
    return this.pokeS.allPokemons;
  }
}
