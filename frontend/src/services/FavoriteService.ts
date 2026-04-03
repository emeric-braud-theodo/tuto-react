import { BFFCaller } from '../utils/BFFCaller';
import { Pokemon } from './PokemonService';

export class FavoriteService extends BFFCaller {
    static async getAll(token: string): Promise<string[]> {
        const favorites = await this.call('favorites', token, {
            method: 'GET',
        });

        return favorites.map((fav: { pokemonName: string }) => fav.pokemonName);
    }
    static async getAllPokemons(token: string): Promise<Pokemon[]> {
        const favoritePokemons = await this.call('favorites/pokeFormat', token, {
            method: 'GET',
        });
        return favoritePokemons;
    }

    static async isFavorite(token: string, name: string): Promise<boolean> {
        const favorites = await this.getAll(token);
        return favorites.includes(name);
    }

    static async add(token: string, name: string): Promise<void> {
        await this.call('favorites', token, {
            method: 'POST',
            body: JSON.stringify({ pokemonName: name }),
        });
    }

    static async remove(token: string, name: string): Promise<void> {
        await this.call('favorites', token, {
            method: 'DELETE',
            body: JSON.stringify({ pokemonName: name }),
        });
    }

    static async toggle(token: string, name: string): Promise<void> {
        const exists = await this.isFavorite(token, name);

        if (exists) {
            await this.remove(token, name);
        } else {
            await this.add(token, name);
        }
    }

    static async setFavorite(
        token: string,
        name: string,
        value: boolean,
    ): Promise<void> {
        if (value) {
            await this.add(token, name);
        } else {
            await this.remove(token, name);
        }
    }
}