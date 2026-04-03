import { BFFCaller } from "../utils/BFFCaller";

export interface NamedApiResource {
    name: string;
    url: string;
}

export interface PokemonAbility {
    ability: NamedApiResource;
    is_hidden: boolean;
    slot: number;
}

export interface PokemonCries {
    latest: string | null;
    legacy: string | null;
}

export interface PokemonGameIndex {
    game_index: number;
    version: NamedApiResource;
}

export interface PokemonHeldItemVersionDetail {
    rarity: number;
    version: NamedApiResource;
}

export interface PokemonHeldItem {
    item: NamedApiResource;
    version_details: PokemonHeldItemVersionDetail[];
}

export interface PokemonMoveVersionGroupDetail {
    level_learned_at: number;
    move_learn_method: NamedApiResource;
    order: number | null;
    version_group: NamedApiResource;
}

export interface PokemonMove {
    move: NamedApiResource;
    version_group_details: PokemonMoveVersionGroupDetail[];
}

export interface PokemonPastAbility {
    abilities: Array<{
        ability: NamedApiResource | null;
        is_hidden: boolean;
        slot: number;
    }>;
    generation: NamedApiResource;
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedApiResource;
}

export interface PokemonPastStat {
    generation: NamedApiResource;
    stats: PokemonStat[];
}

export interface PokemonType {
    slot: number;
    type: NamedApiResource;
}

export interface PokemonSprites {
    back_default?: string | null;
    back_female?: string | null;
    back_shiny?: string | null;
    back_shiny_female?: string | null;
    front_default: string | null;
    front_female?: string | null;
    front_shiny: string | null;
    front_shiny_female?: string | null;
    other?: {
        dream_world?: {
            front_default: string | null;
            front_female: string | null;
        };
        home?: {
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
        'official-artwork'?: {
            front_default: string | null;
            front_shiny: string | null;
        };
        showdown?: {
            back_default: string | null;
            back_female: string | null;
            back_shiny: string | null;
            back_shiny_female: string | null;
            front_default: string | null;
            front_female: string | null;
            front_shiny: string | null;
            front_shiny_female: string | null;
        };
    };
    versions?: Record<string, unknown>;
}

export interface Pokemon {
    id?: number;
    name?: string;
    base_experience?: number;
    height?: number;
    weight?: number;
    order?: number;
    is_default?: boolean;
    location_area_encounters?: string;

    abilities?: PokemonAbility[];
    cries?: PokemonCries;
    forms?: NamedApiResource[];
    game_indices?: PokemonGameIndex[];
    held_items?: PokemonHeldItem[];
    moves?: PokemonMove[];

    past_abilities?: PokemonPastAbility[];
    past_stats?: PokemonPastStat[];
    past_types?: PokemonType[];

    species?: NamedApiResource;
    sprites: PokemonSprites;
    stats?: PokemonStat[];
    types?: PokemonType[];
}
export interface PokemonList {
    count: number;
    results: Array<Pokemon>;
}

export class PokemonService extends BFFCaller {
    static async getAll(limit: number, offset: number, query: string): Promise<PokemonList> {
        const result = PokemonService.call(`pokemon?limit=${limit}&offset=${offset}&q=${query}`);
        return result;
    }
    static async getByName(name: string): Promise<Pokemon> {
        const result = PokemonService.call(`pokemon/${name}`);
        return result;
    }
}