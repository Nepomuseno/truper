import { ChangeDetectionStrategy, Component, inject, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Pokemon } from "../../interfaces/pokemon";
import { PokemonService } from "../../services/pokemon.service";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ModalPokemonComponent } from "../modal-pokemon/modal-pokemon.component";
import { NotImageDirective } from "../../directives/not-image.directive";

@Component({
  selector: "app-pokemon-card",
  imports: [MatCardModule, MatButtonModule, NotImageDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: "./pokemon-card.component.html",
  styleUrl: "./pokemon-card.component.scss",
})
export class PokemonCardComponent {
  pokemon = input.required<Pokemon>();
  pokeS = inject(PokemonService);
  dialog = inject(MatDialog);

  deleteFromLocal() {
    this.pokeS.deletePokemon(this.pokemon().id);
  }

  openDialog() {
    this.dialog.open(ModalPokemonComponent, {
      data: {
        pokemon: this.pokemon(),
      },
    });
  }
}
