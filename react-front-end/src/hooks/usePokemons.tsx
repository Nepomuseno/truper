import { getDataPokemonsAction } from "@/actions/getPokemons.action";
import { useQuery } from "@tanstack/react-query";

export const usePokemons = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => getDataPokemonsAction(),
    staleTime: 1000 * 60 * 60,
  });
};
