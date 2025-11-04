import { Component, inject, model, signal, Signal } from "@angular/core";
import { PokemonService } from "../../services/pokemon.service";
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { Pokemon } from "../../interfaces/pokemon";
import { PokeFilterPipe } from "../../pipes/poke-filter.pipe";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatButtonModule } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";

@Component({
  selector: "app-home",
  imports: [SearchBarComponent, PokemonCardComponent, PokeFilterPipe, MatProgressSpinnerModule, MatButtonModule, RouterLink],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.scss",
})
export class HomeComponent {
  pokeS = inject(PokemonService);
  searchTerm = signal<string>("");
  isComparable = signal<boolean>(false);
  idComparables = signal<number[]>([]);
  private _snackBar = inject(MatSnackBar);

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

  handleComparables(pokemonId: number) {
    if (this.idComparables().includes(pokemonId)) {
      this.idComparables.update((ids) => ids.filter((id) => id !== pokemonId));
      this.isComparable.set(this.idComparables().length >= 2);
      return;
    }

    if (this.idComparables().length >= 3) {
      this.openSnackBar();
      return;
    }

    if (this.idComparables().length >= 0) {
      this.idComparables.update((ids) => [...ids, pokemonId]);
      this.isComparable.set(this.idComparables().length >= 2);
      return;
    }
  }

  openSnackBar() {
    this._snackBar.open("Solo puedes comparar hasta 3 pokemon!!", "Ok");
  }
}
