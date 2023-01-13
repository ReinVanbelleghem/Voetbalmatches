import "reflect-metadata";
import { DataSource } from "typeorm";
import { Speler } from "./entity/Speler";
import { Coach } from "./entity/Coach";
import { Voetbalploeg } from "./entity/Voetbalploeg";
import { Doelpunt } from "./entity/Doelpunt";
import { Wedstrijd } from "./entity/Wedstrijd";
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [Speler, Coach, Voetbalploeg, Doelpunt, Wedstrijd],
    migrations: [],
    subscribers: []
});
