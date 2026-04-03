import PokemonList from "../../components/pokemon/PokemonList/PokemonList";
import { FavoriteService } from "../../services/FavoriteService";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/react";

function FavoritesPage() {
    const { isSignedIn, getToken } = useAuth();

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["favorites"],
        enabled: isSignedIn,
        queryFn: async () => {
            const token = await getToken();

            if (!token) {
                throw new Error("Utilisateur non connecté");
            }

            return FavoriteService.getAllPokemons(token);
        },
    });

    if (!isSignedIn) {
        return <div>Connecte-toi pour voir tes favoris.</div>;
    }

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (isError) {
        return <div>Erreur lors du chargement des favoris.</div>;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl">Mes favoris</h1>
            <PokemonList pokemons={data} isLoading={isFetching} />
        </div>
    );
}

export default FavoritesPage;