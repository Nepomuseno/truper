import { Component, inject, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Pokemon } from "../../interfaces/pokemon";
import { MAT_DIALOG_DATA, MatDialogClose } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { NotImageDirective } from "../../directives/not-image.directive";

@Component({
  selector: "app-modal-pokemon",
  imports: [MatCardModule, MatButtonModule, MatDialogClose, MatListModule, NotImageDirective],
  templateUrl: "./modal-pokemon.component.html",
  styleUrl: "./modal-pokemon.component.scss",
})
export class ModalPokemonComponent {
  data = inject(MAT_DIALOG_DATA);
  pokemon = signal<Pokemon>(this.data.pokemon);
}
