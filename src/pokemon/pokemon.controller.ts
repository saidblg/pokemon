import { Controller, Post, Delete, Get, Logger, Param, Body, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { FetchPokemonDto } from './dto/fetch-pokemon.dto';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('pokemon')
@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  private readonly logger = new Logger(PokemonController.name);

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
    console.log('start and end id number:', start, end);
    for (let i = start; i <= end; i++) {
      const pokemon = await this.pokemonService.fetchAndSavePokemonData(i);
      results.push(pokemon);
    }
    return results;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a Pokemon by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the Pokemon to delete',
  })
  async deletePokemon(@Param('id') id: string): Promise<void> {
    this.logger.log(`${id} delete api çağrıldı`);
    return this.pokemonService.softDeletePokemon(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific Pokemon by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'ID of the Pokemon to fetch',
  })
  async getPokemon(@Param('id') id: string) {
    this.logger.log(`${id} get api çağrıldı`);
    try {
      return await this.pokemonService.findOne(id);
    } catch (error) {
      this.logger.error(`Error fetching Pokemon with ID ${id}`, error.stack);
      throw error;
    }
  }
}
