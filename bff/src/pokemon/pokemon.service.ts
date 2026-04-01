import { Injectable } from '@nestjs/common';
import { PokemonList } from './entities/pokemon_list.entity';
import { Pokemon } from './entities/pokemon.entity';


@Injectable()
export class PokemonService {
  async findAll(): Promise<Array<Pokemon>> {
    const result: PokemonList = await this.call("pokemon");
    const pokeList = await Promise.all(result.results.map((result) => this.call_raw_url(result.url)));
    return pokeList;
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
