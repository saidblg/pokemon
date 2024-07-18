import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { PokemonAbstract } from './abstract-pokemon.entity';

@Entity()
export class Pokemon extends PokemonAbstract {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  category: string;

  @Column()
  weight: number;

  @Column()
  game_version: string;

  @Column()
  experience: number;

  @Column()
  cost: number;
}
