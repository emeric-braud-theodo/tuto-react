import { BFFCaller } from "../utils/BFFCaller";

export interface Pokemon {
    sprites: {
        front_default: string | null;
    }
    name: string | null;
}

export class PokemonService extends BFFCaller {
    static async getAll(): Promise<Array<Pokemon>> {
        const result = PokemonService.call("pokemon/");
        return result;
    }
    static async getByName(name: string): Promise<Pokemon> {
        const result = PokemonService.call(`pokemon/${name}`);
        return result;
    }
}