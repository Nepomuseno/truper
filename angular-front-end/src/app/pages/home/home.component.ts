import { Component, inject, model, signal, Signal } from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { Pokemon } from "../../interfaces/pokemon";
import { PokeFilterPipe } from "../../pipes/poke-filter.pipe";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-home",
  imports: [SearchBarComponent, PokemonCardComponent, PokeFilterPipe, MatProgressSpinnerModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  pokeS = inject(PokemonService);
  searchTerm = signal<string>("");

  trackById(index: number, pokemon: any) {
    return pokemon.id;
  }

  searchPokemon(event: string) {
    this.searchTerm.set(event);
  }

  get pokemons(): Signal<Pokemon[]> {
    return this.pokeS.allPokemons;
  }

  get loading(): Signal<boolean> {
    return this.pokeS.loading;
  }
}
