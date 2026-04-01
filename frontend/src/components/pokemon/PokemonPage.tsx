import { useParams } from "react-router-dom";
import { PokemonService } from "../../services/PokemonService";
import { useQuery } from "@tanstack/react-query";

function PokemonPage() {
    const { name } = useParams();
    const { data, isLoading, isError } = useQuery({
        queryKey: ["pokemon", name],
        queryFn: () => PokemonService.getByName(name!),
        enabled: !!name
    })
    if (isLoading) return <div> Chargement... </div>
    if (isError) return <div> Erreur</div>
    return (
        <div>
            <h1>{name}</h1>
            <img src={data?.sprites.front_default ?? ""} />
        </div>
    );
};

export default PokemonPage;