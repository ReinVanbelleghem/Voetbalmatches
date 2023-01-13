import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
//import { User } from "./entity/User";
import { Speler } from "./entity/Speler";
import { Coach } from "./entity/Coach";
import { Voetbalploeg } from "./entity/Voetbalploeg";
import { Wedstrijd } from "./entity/Wedstrijd";
import { Doelpunt } from "./entity/Doelpunt";
import { Sockets } from "./sockets";

AppDataSource.initialize()
    .then(async () => {
        // Maak socket
        let sockets = new Sockets();
        const app = require("express")();
        const server = require("http").createServer(app);
        const io = require("socket.io")(server, {
            cors: {
                origin: ["http://localhost:3000"]
            }
        });

        io.on("connection", (socket) => {
            let matchid = socket.handshake.query.matchId;
            sockets.addSocket(socket);
            console.log(socket.id + " connected " + "connected with match id: " + matchid);
        }); // create express app

        const cors = require("cors");
        app.use(cors());

        app.use(bodyParser.json());
        server.listen(8080, function () {
            console.log(`Listening on port 8080`);
        });

        // register express routes from defined application routes
        Routes.forEach((route) => {
            (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = new (route.controller as any)()[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });

        async function init() {
            let speler = AppDataSource.manager.create(Speler, {
                voorNaam: "Rein",
                achterNaam: "Vanbelleghem",
                leeftijd: 20,
                rugNummer: 23
            });

            let speler2 = AppDataSource.manager.create(Speler, {
                voorNaam: "Rune",
                achterNaam: "Piro",
                leeftijd: 20,
                rugNummer: 12
            });
            let coach2 = AppDataSource.manager.create(Coach, {
                voorNaam: "Niels",
                achterNaam: "Pils",
                leeftijd: 20
            });

            let coach = AppDataSource.manager.create(Coach, {
                voorNaam: "Adrian",
                achterNaam: "Van den Broeck",
                leeftijd: 20
            });

            let voetbalploeg2 = AppDataSource.manager.create(Voetbalploeg, {
                ploegNaam: "FC Milaan",
                coach: coach2,
                spelers: [speler2]
            });
            let voetbalploegA = AppDataSource.manager.create(Voetbalploeg, {
                ploegNaam: "FC Barcelona",
                coach: coach,
                spelers: [speler]
            });
            await AppDataSource.manager.save(speler);
            await AppDataSource.manager.save(speler2);
            await AppDataSource.manager.save(voetbalploegA);
            await AppDataSource.manager.save(voetbalploeg2);
            let doelpunt = AppDataSource.manager.create(Doelpunt, {
                scorendePloeg: voetbalploegA,
                tijdstipInMinuten: 43,
                scorendeSpeler: speler
            });
            let doelpunt2 = AppDataSource.manager.create(Doelpunt, {
                scorendePloeg: voetbalploeg2,
                tijdstipInMinuten: 76,
                scorendeSpeler: speler2
            });
            let wedstrijd = AppDataSource.manager.create(Wedstrijd, {
                voetbalploegA: voetbalploegA,
                voetbalploegB: voetbalploeg2,
                scoreA: 1,
                scoreB: 1,
                doelpunten: [doelpunt, doelpunt2]
            });

            await AppDataSource.manager.save(wedstrijd);
        }

        //init();

        console.log("Express server has started on port 8080. Open http://localhost:8080/wedstrijden to see results");
    })
    .catch((error) => console.log(error));
