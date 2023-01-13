import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Speler } from "../entity/Speler";
import { Voetbalploeg } from "../entity/Voetbalploeg";
import { Sockets } from "../sockets";

export class VoetbalploegController {
    private voetbalRepository = AppDataSource.getRepository(Voetbalploeg);
    async all(request: Request, response: Response, next: NextFunction) {
        let voetbalploeg = this.voetbalRepository.find({
            relations: ["coach"]
        });
        return voetbalploeg;
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.voetbalRepository.findOneBy({
            id: request.params.id
        });
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.voetbalRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await this.voetbalRepository.findOneBy({ id: request.params.id });
        await this.voetbalRepository.remove(userToRemove);
    }
}
