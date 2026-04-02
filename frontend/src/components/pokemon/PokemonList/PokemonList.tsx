import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PokemonService } from '../../../services/PokemonService';
import Pagination from '../../global/Pagination/Pagination';
import PokemonListRow from './PokemonListRow';
import FilterSearch from '../../global/FilterSearch/FilterSearch';
import styles from "./PokemonList.module.css";

function PokeList() {
    const [offsetState, offsetStateChange] = useState(0);
    const [nameFilter, nameFilterChange] = useState("");
    const limit = 20;

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ["poke_list", limit, offsetState, nameFilter],
        queryFn: () => PokemonService.getAll(limit, offsetState, nameFilter)
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

            <div className={styles.PokemonListWrapper}>
                {isLoading || !data
                    ? Array.from({ length: limit }).map((_, index) => (
                        <PokemonListRow key={index} isLoading tabIndex={0} />
                    ))
                    : data.results.map((item) => (
                        <PokemonListRow key={item.name} poke={item} tabIndex={0} />
                    ))}
            </div>

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

export default PokeList;