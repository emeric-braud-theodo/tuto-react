import { Pokemon } from '../../../services/PokemonService';
import PokemonListRow from './PokemonListRow';
import styles from './PokemonList.module.css';

type PokemonListProps = {
    pokemons?: Pokemon[];
    isLoading?: boolean;
    limit?: number;
    emptyMessage?: string;
};

function PokemonList({
    pokemons,
    isLoading = false,
    limit = 20,
    emptyMessage = 'Aucun Pokémon',
}: PokemonListProps) {
    return (
        <div className={styles.PokemonListWrapper}>
            {isLoading
                ? Array.from({ length: limit }).map((_, index) => (
                    <PokemonListRow key={index} isLoading tabIndex={0} />
                ))
                : pokemons && pokemons.length > 0
                    ? pokemons.map((pokemon) => (
                        <PokemonListRow
                            key={pokemon.name}
                            poke={pokemon}
                            tabIndex={0}
                        />
                    ))
                    : <div>{emptyMessage}</div>}
        </div>
    );
}

export default PokemonList;