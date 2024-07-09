import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
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
  category: number;

  @Column()
  weight: number;

  @Column()
  game_version: string;

  @Column()
  experience: number;

  @Column()
  cost: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;
}
