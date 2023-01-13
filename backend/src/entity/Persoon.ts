import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export abstract class Persoon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    voorNaam: string;

    @Column()
    achterNaam: string;

    @Column()
    leeftijd: number;
}
