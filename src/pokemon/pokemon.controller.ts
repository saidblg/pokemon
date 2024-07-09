import { Controller, Post, Logger, Param, Body, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { FetchPokemonDto } from './dto/fetch-pokemon.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  private readonly logger = new Logger(PokemonController.name);
/*
  @Post('fetch')
  @ApiOperation({ summary: 'Fetch a specific Pokemon by ID' })
  @ApiBody({
    type: FetchPokemonDto,
    description: 'DTO containing ID of the Pokemon to fetch',
  })
  async fetchPokemon(@Body() fetchPokemonDto: FetchPokemonDto) {
    const { id } = fetchPokemonDto;
    this.logger.log(`${id} fetch api çağrıldı`);
    return this.pokemonService.fetchAndSavePokemonData(id);
  }
*/
  @Post('fetch/:id')
  @ApiOperation({ summary: 'Fetch a specific Pokemon by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'ID of the Pokemon to fetch',
  })
  async fetchPokemon(@Param('id') id: number) {
    this.logger.log(`${id} fetch2 api çağrıldı`);
    return this.pokemonService.fetchAndSavePokemonData(id);
  }

  @Post('fetch-range')
  @ApiOperation({ summary: 'Fetch pokemons from start id to end id' })
  @ApiQuery({
    name: 'start',
    type: 'number',
    description: 'start ID of the Pokemon to fetch',
  })
  @ApiQuery({
    name: 'end',
    type: 'number',
    description: 'end ID of the Pokemon to fetch',
  })
  async fetchPokemonInRange(@Query('start') start: number,@Query('end') end: number) {
    const results = [];
    console.log('start and end id number:',start,end);
    for (let i = start; i <= end; i++) {
      const pokemon = await this.pokemonService.fetchAndSavePokemonData(i);
      results.push(pokemon);
    }
    return results;
  }
}