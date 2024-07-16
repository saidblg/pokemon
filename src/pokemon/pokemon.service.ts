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
    private pokemonRepository: Repository<Pokemon>,private readonly configService: ConfigService
  ) {
    
  }

  
  async fetchAndSavePokemonData(id: number): Promise<Pokemon> {
    
    let data;
    let pokemon;
    let api;
    //
    try {
      const response = await axios.get(
        `${api}/${id}`,
      );
      console.log('Response from PokeAPI: ', response); // Console log for response
      data = response.data;
      console.log('Fetched Pokemon Data: ', data); // Console log for fetched data
      console.log('Pokemon Name: ', data.name); // Console log for Pokemon name

      const existingPokemon = await this.pokemonRepository.findOne({
        where: { name: data.name },
      });
      console.log('Existing Pokemon: ', existingPokemon); // Console log for existing Pokemon

      pokemon = existingPokemon || new Pokemon();
      pokemon.name = data.name;
      pokemon.type = data.types[0].type.name;

//
const enumKeys = Object.keys(PokemonType).filter(key => isNaN(Number(key))); 

pokemon.category = enumKeys.indexOf(data.types[0].type.name);
console.log('tip adı: ', data.types[0].type.name); 
console.log('Categori: ', pokemon.category); 
console.log('enumkeys: ', enumKeys);

    //  pokemon.category = PokemonType[0];
      pokemon.weight = data.weight;
      pokemon.game_version = data.game_indices[0].version.name
      pokemon.experience = data.base_experience;
      pokemon.cost = pokemon.experience * pokemon.weight;
      return this.pokemonRepository.save(pokemon);
    } catch (error) {
      console.log('Error fetching/saving Pokemon data: ', error); // Console log for error
      data = '';
      return data;
    }
  }
}
