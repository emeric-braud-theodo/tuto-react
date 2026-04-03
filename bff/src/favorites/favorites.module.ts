import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritePokemon } from './entities/favorite-pokemon.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { PokemonService } from 'src/pokemon/pokemon.service';

@Module({
    imports: [TypeOrmModule.forFeature([FavoritePokemon, User]), UsersModule],
    controllers: [FavoritesController],
    providers: [FavoritesService, PokemonService],
})
export class FavoritesModule { }