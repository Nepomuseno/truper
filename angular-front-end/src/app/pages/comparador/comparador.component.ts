import { Component, inject, input, Input, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { PokemonService } from "../../services/pokemon.service";
import { Pokemon } from "../../interfaces/pokemon";
import { TitleCasePipe } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: "app-comparador",
  standalone: true, // ✅ importante
  imports: [TitleCasePipe, MatButtonModule, RouterLink],
  templateUrl: "./comparador.component.html",
  styleUrls: ["./comparador.component.scss"],
})
export class ComparadorComponent {
  actRouter = inject(ActivatedRoute);
  pokeS = inject(PokemonService);
  ids = this.actRouter.snapshot.paramMap.get("ids");
  idComparables = signal<number[]>(this.ids ? this.ids.split("-").map(Number) : []);
  pokemons = signal<Pokemon[]>([]);

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons() {
    const poke = this.pokeS.getOnePokemnon(this.idComparables());
    this.pokemons.set(poke);
  }
}
