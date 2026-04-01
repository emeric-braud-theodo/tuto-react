class PokemonListItem {
    name: string;
    url: string;
}

export class PokemonList {
    previous: string | null;
    next: string | null;
    count: number;
    results: Array<PokemonListItem>;
}