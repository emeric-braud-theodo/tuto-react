import { useQuery } from '@tanstack/react-query';
import { PokemonService } from '../../services/PokemonService';
import PokemonListRow from './PokemonListRow';

function PokeList() {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["poke_list"],
        queryFn: PokemonService.getAll
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) {
        console.error()
        return <div>Error</div>;
    }
    if (!data) return <div>Empty result</div>;
    return (
        <div>
            <h1>Liste des Pokemons</h1>
            <div>
                {
                    data.map((item, index) => {
                        return (
                            <PokemonListRow key={index} poke={item} />
                        );
                    })
                }
            </div>

        </div>
    );
}
export default PokeList;