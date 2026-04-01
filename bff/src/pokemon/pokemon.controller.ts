import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonList } from './entities/pokemon_list.entity';
import { Pokemon } from './entities/pokemon.entity';
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Get()
  findAll(): Promise<Array<Pokemon>> {
    return this.pokemonService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.pokemonService.findOne(name);
  }

}
