import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import axios from 'axios';
import { PokemonType } from './enums/type.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    private readonly configService: ConfigService
  ) {}

  async fetchAndSavePokemonData(id: number): Promise<Pokemon> {
    let data;
    let pokemon;
    const api = this.configService.get<string>('POKEAPI_URL');
    //
    try {
      const response = await axios.get(`${api}/${id}`);
      console.log('Response from PokeAPI: ', response); 
      data = response.data;
      console.log('Fetched Pokemon Data: ', data); 
      console.log('Pokemon Name: ', data.name);

      const existingPokemon = await this.pokemonRepository.findOne({
        where: { name: data.name },
      });
      console.log('Existing Pokemon: ', existingPokemon); // Console log for existing Pokemon

      pokemon = existingPokemon || new Pokemon();
      pokemon.name = data.name;
      pokemon.type = data.types[0].type.name;

      const enumKeys = Object.keys(PokemonType).filter(key => isNaN(Number(key)));

      pokemon.category = enumKeys.indexOf(data.types[0].type.name);
      console.log('tip adı: ', data.types[0].type.name);
      console.log('Categori: ', pokemon.category);
      console.log('enumkeys: ', enumKeys);

      pokemon.weight = data.weight;
      pokemon.game_version = data.game_indices[0].version.name;
      pokemon.experience = data.base_experience;
      pokemon.cost = pokemon.experience * pokemon.weight;
      return this.pokemonRepository.save(pokemon);
    } catch (error) {
      console.log('Error fetching/saving Pokemon data: ', error); 
      throw error;
    }
  }

  async softDeletePokemon(id: string): Promise<void> {
    await this.pokemonRepository.softDelete(id);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  async findOne(id: string): Promise<Pokemon> {
    try {
      return await this.pokemonRepository.findOne({ where: { id } });
    } catch (error) {
      console.log('Error fetching Pokemon by ID: ', error);
      throw error;
    }
  }


}
