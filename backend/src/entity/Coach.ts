import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Persoon } from "./Persoon";
import { Voetbalploeg } from "./Voetbalploeg";

@Entity()
export class Coach extends Persoon {
    @OneToOne(() => Voetbalploeg, (Voetbalploeg) => Voetbalploeg.coach)
    voetbalPloeg: Voetbalploeg;
}
