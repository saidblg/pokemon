import { Pokemon } from './entities/pokemon.entity';
import { FetchPokemonDto } from './dto/fetch-pokemon.dto';
import { PokemonType } from './enums/type.enum';

export const toFetchPokemonDto = (pokemon: Pokemon): FetchPokemonDto => {
  return {
    id: pokemon.id,
    type: PokemonType[pokemon.type],
    category: pokemon.category,
  };
};
