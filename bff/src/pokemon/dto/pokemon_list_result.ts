import { Pokemon } from "../entities/pokemon.entity";

export type PokemonListResult = {
    count: number;
    results: Array<Pokemon>;
};