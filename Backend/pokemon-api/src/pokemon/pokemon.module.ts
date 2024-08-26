import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { Pokemon } from './entities/pokemon.entity';
import { BattleResult } from './entities/battleResult.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, BattleResult])],
  controllers: [PokemonController],
  providers: [PokemonService]
})
export class PokemonModule {}
