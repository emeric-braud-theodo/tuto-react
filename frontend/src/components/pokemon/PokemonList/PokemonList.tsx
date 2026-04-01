import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { PokemonService } from '../../../services/PokemonService';
import Pagination from '../../global/Pagination/Pagination';
import PokemonListRow from './PokemonListRow';
import styles from "./PokemonList.module.css";

function PokeList() {
    const [offsetState, offsetStateChange] = useState(0);
    const limit = 20;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["poke_list", limit, offsetState],
        queryFn: () => PokemonService.getAll(limit, offsetState)
    });

    if (isError) {
        return <div>Error</div>;
    }

    if (isLoading) {
        return (
            <div>
                <h1 className="font-extrabold text-2xl">Liste des Pokemons</h1>
                <div className={styles.PokemonListWrapper}>
                    {Array.from({ length: limit }).map((_, index) => (
                        <PokemonListRow key={index} isLoading tabIndex={0} />
                    ))}
                </div>
            </div>
        );
    }

    if (!data) return <div>Empty result</div>;

    const maxPage = Math.ceil(data.count / limit) - 1;

    const onClickBefore = () => {
        offsetStateChange(Math.max(offsetState - limit, 0));
    };

    const onClickAfter = () => {
        offsetStateChange(Math.min(offsetState + limit, maxPage * limit));
    };

    return (
        <div>
            <h1 className="font-extrabold text-2xl">Liste des Pokemons</h1>
            <div className={styles.PokemonListWrapper}>
                {data.results.map((item) => (
                    <PokemonListRow key={item.name} poke={item} tabIndex={0} isLoading={false} />
                ))}
            </div>
            <Pagination
                currentPage={Math.floor(offsetState / limit)}
                maxPage={maxPage}
                onClickAfter={onClickAfter}
                onClickBefore={onClickBefore}
            />
        </div>
    );
}

export default PokeList;