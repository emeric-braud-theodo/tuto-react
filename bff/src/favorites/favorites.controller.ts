import { Controller, Get, Post, Delete, Body, UseGuards, Req } from '@nestjs/common';
import { ClerkAuthGuard } from 'src/auth/cleark-auth.guard';
import { FavoritesService } from './favorites.service';
import { UsersService } from '../users/users.service';

@Controller('favorites')
@UseGuards(ClerkAuthGuard)
export class FavoritesController {
    constructor(
        private readonly favoritesService: FavoritesService,
        private readonly usersService: UsersService,
    ) { }

    @Get()
    async getMyFavorites(@Req() req: any) {
        const clerkUserId = req.auth.sub;
        return this.favoritesService.listForUser(clerkUserId);
    }
    @Get("/pokeFormat")
    async getMyFavoritesPokeFormat(@Req() req: any) {
        const clerkUserId = req.auth.sub;
        return this.favoritesService.listForUserPokeFormat(clerkUserId);
    }

    @Post()
    async addFavorite(@Req() req: any, @Body() body: { pokemonName: string; email?: string }) {
        const clerkUserId = req.auth.sub;

        await this.usersService.findOrCreateFromClerk(clerkUserId, body.email);

        return this.favoritesService.add(clerkUserId, body.pokemonName);
    }

    @Delete()
    async removeFavorite(@Req() req: any, @Body() body: { pokemonName: string }) {
        const clerkUserId = req.auth.sub;
        await this.favoritesService.remove(clerkUserId, body.pokemonName);
        return { deleted: true };
    }
}