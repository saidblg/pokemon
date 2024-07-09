import { Column } from "typeorm";

export abstract class PokemonAbstract {
    @Column({nullable: true})
    as: string;
}