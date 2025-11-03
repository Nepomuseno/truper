import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Pokemon } from "../../interfaces/pokemon";
import { PokemonService } from "../../services/pokemon.service";

@Component({
  selector: "app-pokemon-card",
  imports: [MatCardModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./pokemon-card.component.html",
  styleUrl: "./pokemon-card.component.scss",
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  pokeS = inject(PokemonService);

  deleteFromLocal(id: string) {
    this.pokeS.deletePokemon(id);
  }
}
