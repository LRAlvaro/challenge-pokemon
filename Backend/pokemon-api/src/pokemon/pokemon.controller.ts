import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';

export interface BattleDto {
  readonly pokemon1Id: number;
  readonly pokemon2Id: number;
}
@Controller('pokemon')
export class PokemonController {

    constructor(private readonly pokemonService: PokemonService) {}

    @Get('')
    getAll(): Promise<Pokemon[]> {
      return this.pokemonService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number): Promise<Pokemon> {
      return this.pokemonService.getOne(id);
    }

  @Post('battle')
  async battle(@Body() battleDto: BattleDto): Promise<{ winner: Pokemon; loser: Pokemon }> {
    return this.pokemonService.battle(battleDto);
  }
}
