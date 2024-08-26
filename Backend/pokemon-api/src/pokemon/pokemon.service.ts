import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { BattleResult } from './entities/battleResult.entity';
import { BattleDto } from './pokemon.controller';


@Injectable()
export class PokemonService {
    constructor(
        @InjectRepository(Pokemon)
        private pokemonRepository: Repository<Pokemon>,
        @InjectRepository(BattleResult)
        private readonly battleResultRepository: Repository<BattleResult>,
      ) {}
    
      getAll(): Promise<Pokemon[]> {
        return this.pokemonRepository.find();
      }
    
      async getOne(id: number): Promise<Pokemon> {
        const pokemon = await this.pokemonRepository.findOne({ where: { id } });
        if (!pokemon) {
          throw new NotFoundException('El pokemon no se encuentra')
        }
        return pokemon;
      }

      async battle(battleDto: BattleDto): Promise<{ winner: Pokemon; loser: Pokemon }> {
            const { pokemon1Id, pokemon2Id } = battleDto;

            const pokemon1 = await this.pokemonRepository.findOne({ where: { id: pokemon1Id } });
            const pokemon2 = await this.pokemonRepository.findOne({ where: { id: pokemon2Id } });
            
            let firstAttacker: Pokemon;
            let secondAttacker: Pokemon;

            if (pokemon1.speed > pokemon2.speed) {
              firstAttacker = pokemon1;
              secondAttacker = pokemon2;
            } else if (pokemon2.speed > pokemon1.speed) {
              firstAttacker = pokemon2;
              secondAttacker = pokemon1;
            } else {
              if (pokemon1.attack > pokemon2.attack) {
                firstAttacker = pokemon1;
                secondAttacker = pokemon2;
              } else {
                firstAttacker = pokemon2;
                secondAttacker = pokemon1;
              }
            }

            let turns = 0;
            while (pokemon1.hp > 0 && pokemon2.hp > 0) {
              turns++;

          
              let damage = firstAttacker.attack - secondAttacker.defense;
              damage = damage > 0 ? damage : 1;
              secondAttacker.hp -= damage;

              if (secondAttacker.hp <= 0) {
                break;
              }

            
              damage = secondAttacker.attack - firstAttacker.defense;
              damage = damage > 0 ? damage : 1;
              firstAttacker.hp -= damage;

              if (firstAttacker.hp <= 0) {
                break;
              }
            }

            let winner: Pokemon;
            let loser: Pokemon;

            if (pokemon1.hp > 0) {
              winner = pokemon1;
              loser = pokemon2;
            } else {
              winner = pokemon2;
              loser = pokemon1;
            }

      
            const battleResult = new BattleResult();
            battleResult.winner = winner  
            battleResult.loser = loser  
            battleResult.turns = turns
            await this.battleResultRepository.save(battleResult);

            return { winner, loser }
          }

         
        
      
}
