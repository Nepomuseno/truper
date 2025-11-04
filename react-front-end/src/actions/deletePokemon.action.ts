import type { Pokemon } from "@/interfaces/pokemon";

export const deletePokemonAction = async (id: number) => {
  const stored = localStorage.getItem("pokemons-react");
  if (!stored) return [];

  const pokemons: Pokemon[] = JSON.parse(stored);
  const filtered = pokemons.filter((p) => p.id !== id);

  localStorage.setItem("pokemons-react", JSON.stringify(filtered));

  return filtered;
};
