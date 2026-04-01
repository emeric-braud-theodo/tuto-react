import { BFFCaller } from "../utils/BFFCaller";

export interface Pokemon {
    sprites: {
        front_default: string | null;
        front_shiny: string | null;
    }
    name: string | null;
}

export interface PokemonList {
    count: number;
    results: Array<Pokemon>;
}

export class PokemonService extends BFFCaller {
    static async getAll(limit: number, offset: number): Promise<PokemonList> {
        const result = PokemonService.call(`pokemon?limit=${limit}&offset=${offset}`);
        return result;
    }
    static async getByName(name: string): Promise<Pokemon> {
        const result = PokemonService.call(`pokemon/${name}`);
        return result;
    }
}