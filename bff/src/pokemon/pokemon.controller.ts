import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Query } from '@nestjs/common';
import { Pokemon } from './entities/pokemon.entity';
import { PokemonListResult } from './dto/pokemon_list_result';
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  findAll(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('q') query?: string,
  ): Promise<PokemonListResult> {
    if (!!query) return this.pokemonService.search(query, limit, offset);
    return this.pokemonService.findAll(limit ? parseInt(limit) : undefined,
      offset ? parseInt(offset) : undefined);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.pokemonService.findOne(name);
  }


}
