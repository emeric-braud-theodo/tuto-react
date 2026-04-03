import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FavoritePokemon } from './entities/favorite-pokemon.entity';
import { User } from '../users/entities/user.entity';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Injectable()
export class FavoritesService {
    constructor(
        @InjectRepository(FavoritePokemon)
        private readonly favoritesRepository: Repository<FavoritePokemon>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async listForUser(clerkUserId: string) {
        const user = await this.usersRepository.findOne({
            where: { clerkUserId },
            relations: ['favoritePokemons'],
        });

        if (!user) {
            return [];
        }

        return user.favoritePokemons;
    }
    async listForUserPokeFormat(clerkUserId: string) {
        const pokeFavorites = await this.listForUser(clerkUserId);
        if (pokeFavorites.length == 0) return [];
        const s = new PokemonService();
        const pokeList = await Promise.all(pokeFavorites.map(async (p) => {
            return await s.findOne(p.pokemonName);
        }));
        return pokeList;
    }

    async add(clerkUserId: string, pokemonName: string) {
        const user = await this.usersRepository.findOne({
            where: { clerkUserId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const favorite = this.favoritesRepository.create({
            pokemonName,
            user,
        });

        return this.favoritesRepository.save(favorite);
    }

    async remove(clerkUserId: string, pokemonName: string) {
        const user = await this.usersRepository.findOne({
            where: { clerkUserId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        await this.favoritesRepository.delete({
            user: { id: user.id },
            pokemonName,
        });
    }
}