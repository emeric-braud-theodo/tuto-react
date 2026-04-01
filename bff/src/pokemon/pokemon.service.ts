import { Injectable } from '@nestjs/common';
import { PokemonList } from './entities/pokemon_list.entity';
import { Pokemon } from './entities/pokemon.entity';
import { URLSearchParams } from 'url';
import { PokemonListResult } from './dto/pokemon_list_result';

@Injectable()
export class PokemonService {
  async findAll(limit?: number, offset?: number): Promise<PokemonListResult> {
    let url = "pokemon";
    let params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (offset) params.append("offset", offset.toString());

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const result: PokemonList = await this.call(url);
    const pokeList = await Promise.all(result.results.map((result) => this.call_raw_url(result.url)));
    return {
      count: result.count,
      results: pokeList
    };
  }

  async findOne(name: string): Promise<Pokemon> {
    return await this.call(`pokemon/${name}`);
  }

  async findOneById(id: number): Promise<Pokemon> {
    return await this.call(`pokemon/${id}`);
  }

  private async call(route: string) {
    const URL = `https://pokeapi.co/api/v2/${route}`;
    return await this.call_raw_url(URL);
  }

  private async call_raw_url(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
