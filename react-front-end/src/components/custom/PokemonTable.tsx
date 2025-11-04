import { usePokemons } from "@/hooks/usePokemons";
import "./PokemonTable.css";
import { useSearchParams } from "react-router";
import type { Pokemon } from "@/interfaces/pokemon";
import { Button } from "../ui/button";
import { useDeletePokemon } from "@/hooks/useDeletePokemon";
import { useState } from "react";
import { PokemonModal } from "./PokemonModal";

export const PokemonTable = () => {
  const { data } = usePokemons();
  const deleteMutation = useDeletePokemon();

  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  let pokemons: Pokemon[] = data || [];
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  if (query) {
    pokemons = pokemons.filter((pokemon: Pokemon) => pokemon.name.toLowerCase().includes(query.toLowerCase()));
  }

  const deletePokemon = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="pokemon-table-container">
      <table className="pokemon-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Peso</th>
            <th>Altura</th>
            <th>Sprite Frontal</th>
            <th>Sprite Trasero</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pokemons?.map((poke) => (
            <tr key={poke.id} onClick={() => setSelectedPokemon(poke)} style={{ cursor: "pointer" }}>
              <td>{poke.id}</td>
              <td className="poke-name">{poke.name}</td>
              <td>{poke.weight / 10} kg</td>
              <td>{poke.height / 10} m</td>
              <td>
                {poke.sprite?.front ? (
                  <img
                    src={poke.sprite.front}
                    alt={`${poke.name} frontal`}
                    className="sprite"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <span className="no-img">Sin imagen</span>
                )}
              </td>
              <td>
                {poke.sprite?.back ? (
                  <img
                    src={poke.sprite.back}
                    alt={`${poke.name} trasero`}
                    className="sprite"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <span className="no-img">Sin imagen</span>
                )}
              </td>
              <td>
                <Button variant="destructive" size={"sm"} onClick={() => deletePokemon(poke.id)}>
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal */}
      {selectedPokemon && <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />}
    </div>
  );
};
