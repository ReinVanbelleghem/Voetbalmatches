import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Coach } from "./Coach";
import { Doelpunt } from "./Doelpunt";
import { Speler } from "./Speler";
import { Wedstrijd } from "./Wedstrijd";

@Entity()
export class Voetbalploeg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ploegNaam: string;

    @OneToOne(() => Coach, (coach) => coach.voetbalPloeg, {
        cascade: true
    })
    @JoinColumn()
    coach: Coach;

    @OneToMany((type) => Speler, (speler) => speler.voetbalPloeg, {
        cascade: true
    })
    spelers: Speler[];

    @OneToMany((type) => Doelpunt, (doelpunt) => doelpunt.scorendePloeg, {
        cascade: true
    })
    doelpunten: Doelpunt[];
}
