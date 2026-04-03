import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PokemonService } from '../../services/PokemonService';
import Pagination from '../../components/global/Pagination/Pagination';
import FilterSearch from '../../components/global/FilterSearch/FilterSearch';
import PokemonList from '../../components/pokemon/PokemonList/PokemonList';

function PokemonListPage() {
    const [offsetState, offsetStateChange] = useState(0);
    const [nameFilter, nameFilterChange] = useState('');
    const limit = 20;

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ['poke_list', limit, offsetState, nameFilter],
        queryFn: () => PokemonService.getAll(limit, offsetState, nameFilter),
    });

    if (isError) {
        return <div>Error</div>;
    }

    const maxPage = data ? Math.ceil(data.count / limit) - 1 : 0;

    const onClickBefore = () => {
        offsetStateChange(Math.max(offsetState - limit, 0));
    };

    const onClickAfter = () => {
        offsetStateChange(Math.min(offsetState + limit, maxPage * limit));
    };

    return (
        <div>
            <h1 className="font-extrabold text-2xl">Liste des Pokemons</h1>

            <FilterSearch query={nameFilter} queryChange={nameFilterChange} />

            <PokemonList
                pokemons={data?.results}
                isLoading={isLoading || !data}
                limit={limit}
                emptyMessage="Aucun Pokémon trouvé"
            />

            {!isLoading && !!data && (
                <Pagination
                    currentPage={Math.floor(offsetState / limit)}
                    maxPage={maxPage}
                    onClickAfter={onClickAfter}
                    onClickBefore={onClickBefore}
                />
            )}

            {isFetching && <div>Recherche...</div>}
        </div>
    );
}

export default PokemonListPage;