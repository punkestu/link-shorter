import {Request, Response} from "express";
import {LinkUseCase} from "../../usecases/link";
import {Err} from "../../core/entities/error";

export class LinkController {
    private usecase: LinkUseCase;

    constructor(linkUsecase: LinkUseCase) {
        this.usecase = linkUsecase;
    }

    createLink = async (req: Request, res: Response): Promise<void> => {
        try {
            const link = req.body;
            await this.usecase.createLink(link);
            res.status(201).json(link);
        } catch (err) {
            if (err instanceof Err) {
                res.status(err.code).json(err);
                return;
            }
            res.sendStatus(500);
        }
    }
    getMany = async (_: Request, res: Response): Promise<void> => {
        try {
            const link = await this.usecase.getMany();
            res.json(link);
        } catch (err) {
            if (err instanceof Err) {
                res.status(err.code).json(err);
                return;
            }
            res.sendStatus(500);
        }
    }
}