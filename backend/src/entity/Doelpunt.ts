import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Speler } from "./Speler";
import { Voetbalploeg } from "./Voetbalploeg";
import { Wedstrijd } from "./Wedstrijd";

@Entity()
export class Doelpunt {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Voetbalploeg, (voetbalploeg) => voetbalploeg.doelpunten)
    @JoinColumn()
    scorendePloeg: Voetbalploeg;

    // TODO: Scorende persoon toevoegen
    @Column()
    tijdstipInMinuten: number;

    @ManyToOne(() => Speler, (speler) => speler.doelpunten)
    @JoinColumn()
    scorendeSpeler: Speler;

    @ManyToOne(() => Wedstrijd, (wedstrijd) => wedstrijd.doelpunten)
    @JoinColumn()
    wedstrijd: Wedstrijd;
}
