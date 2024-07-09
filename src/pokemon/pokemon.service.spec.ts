import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('axios');

describe('PokemonService', () => {
  let service: PokemonService;
  let repositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        {
          provide: getRepositoryToken(Pokemon),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repositoryMock = module.get(getRepositoryToken(Pokemon));
  });

  it('should fetch and save Pokemon data correctly', async () => {

    const mockData = {
      data: {
        name: 'bulbasaur',
        types: [{ type: { name: 'grass' } }],
        weight: 69,
        base_experience: 64,
      },
    };


    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue(mockData);


    (repositoryMock.findOne as jest.Mock).mockResolvedValue(null); // Simulate no existing Pokemon


    const saveMock = repositoryMock.save as jest.Mock;
    saveMock.mockImplementation((pokemon: Pokemon) => Promise.resolve({ ...pokemon }));


    const savedPokemon = await service.fetchAndSavePokemonData(1);


    expect(savedPokemon).toBeDefined();
    expect(savedPokemon.name).toEqual('bulbasaur');
    expect(savedPokemon.type).toEqual('grass');
    expect(savedPokemon.weight).toEqual(69);
    expect(savedPokemon.experience).toEqual(64);

    expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { name: 'bulbasaur' } });
    expect(repositoryMock.save).toHaveBeenCalled();
  });

  it('should handle errors from axios gracefully', async () => {

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error('API Error'));


    const result = await service.fetchAndSavePokemonData(1);


    expect(result).toEqual('');
  });
});
