import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePokemonAction } from "@/actions/deletePokemon.action";

export const useDeletePokemon = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deletePokemonAction(id),
    onSuccess: () => {
      // Invalidar y refrescar la query de pokemons
      queryClient.invalidateQueries({ queryKey: ["pokemons"] });
    },
  });
};
