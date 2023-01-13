import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Doelpunt } from "../entity/Doelpunt";
import { Speler } from "../entity/Speler";
import { Voetbalploeg } from "../entity/Voetbalploeg";
import { Wedstrijd } from "../entity/Wedstrijd";
import { Sockets } from "../sockets";

export class WedstrijdController {
    private wedstrijdRepository = AppDataSource.getRepository(Wedstrijd);
    private doelpuntenRepo = AppDataSource.getRepository(Doelpunt);

    private sockets = new Sockets();

    async all(request: Request, response: Response, next: NextFunction) {
        if (request.query.ploeg) {
            let wedstrijdenA = await this.wedstrijdRepository.find({
                relations: ["voetbalploegA", "voetbalploegA.coach", "voetbalploegA.spelers", "voetbalploegB", "voetbalploegB.coach", "voetbalploegB.spelers", "doelpunten", "doelpunten.scorendePloeg", "doelpunten.scorendeSpeler"],
                where: {
                    voetbalploegA: {
                        id: request.query.ploeg
                    }
                }
            });
            let wedstrijdenB = await this.wedstrijdRepository.find({
                relations: ["voetbalploegA", "voetbalploegA.coach", "voetbalploegA.spelers", "voetbalploegB", "voetbalploegB.coach", "voetbalploegB.spelers", "doelpunten", "doelpunten.scorendePloeg", "doelpunten.scorendeSpeler"],
                where: {
                    voetbalploegB: {
                        id: request.query.ploeg
                    }
                }
            });

            let wedstrijden = [...wedstrijdenA, ...wedstrijdenB];
            return wedstrijden;
        } else {
            let wedstrijden = this.wedstrijdRepository.find({
                relations: ["voetbalploegA", "voetbalploegA.coach", "voetbalploegA.spelers", "voetbalploegB", "voetbalploegB.coach", "voetbalploegB.spelers", "doelpunten", "doelpunten.scorendePloeg", "doelpunten.scorendeSpeler"]
            });
            return wedstrijden;
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.wedstrijdRepository.findOne({
            where: {
                id: request.params.id
            },
            relations: ["voetbalploegA", "voetbalploegA.coach", "voetbalploegA.spelers", "voetbalploegB", "voetbalploegB.coach", "voetbalploegB.spelers", "doelpunten", "doelpunten.scorendePloeg", "doelpunten.scorendeSpeler"]
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let id = request.body.id;

        let savedData = await this.wedstrijdRepository.save(request.body);

        let socketData = await this.wedstrijdRepository.findOne({
            where: {
                id: request.body.id
            },
            relations: ["voetbalploegA", "voetbalploegA.coach", "voetbalploegA.spelers", "voetbalploegB", "voetbalploegB.coach", "voetbalploegB.spelers", "doelpunten", "doelpunten.scorendePloeg", "doelpunten.scorendeSpeler"]
        });

        for (let socket of this.sockets.allSocketsById(id)) {
            socket.emit("wedstrijd_updated", socketData);
        }

        return savedData;
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let removeItem = await this.wedstrijdRepository.findOneBy({ id: request.params.id });
        let doelpunten = await this.doelpuntenRepo.findBy({ wedstrijd: removeItem });
        await this.doelpuntenRepo.remove(doelpunten);
        await this.wedstrijdRepository.remove(removeItem);
        return "Done";
    }
}
