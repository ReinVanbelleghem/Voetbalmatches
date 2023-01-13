import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Coach } from "./Coach";
import { Doelpunt } from "./Doelpunt";
import { Speler } from "./Speler";
import { Voetbalploeg } from "./Voetbalploeg";

@Entity()
export class Wedstrijd {
    @PrimaryGeneratedColumn()
    id: number;

    /*@Column()
    ploegB: Voetbalploeg;*/

    @ManyToOne(() => Voetbalploeg)
    @JoinColumn()
    voetbalploegA: Voetbalploeg;

    @ManyToOne(() => Voetbalploeg)
    @JoinColumn()
    voetbalploegB: Voetbalploeg;

    @Column({ nullable: true, default: 0 })
    scoreA: number;

    @Column({ nullable: true, default: 0 })
    scoreB: number;

    @OneToMany(() => Doelpunt, (doelpunt) => doelpunt.wedstrijd, {
        cascade: true,
        onDelete: "CASCADE"
    })
    doelpunten: Doelpunt[];
}
