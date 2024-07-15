// abstract-pokemon.entity.ts
import { Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

export abstract class PokemonAbstract {

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true, default: null })
  deleted_at: Date;
}
