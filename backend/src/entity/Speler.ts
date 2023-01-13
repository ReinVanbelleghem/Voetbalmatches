import internal = require("stream");
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { Doelpunt } from "./Doelpunt";
import { Persoon } from "./Persoon";
import { Voetbalploeg } from "./Voetbalploeg";

@Entity()
export class Speler extends Persoon {
    @Column()
    rugNummer: number;

    @ManyToOne(() => Voetbalploeg, (voetbalPloeg) => voetbalPloeg.spelers)
    voetbalPloeg: Voetbalploeg;

    @OneToMany(() => Doelpunt, (doelpunt) => doelpunt.scorendeSpeler, {
        cascade: true
    })
    doelpunten: Doelpunt[];
}
