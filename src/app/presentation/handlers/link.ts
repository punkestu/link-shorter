import {Request, Response} from "express";
import {LinkUseCase} from "../../usecases/link";
import {Err, Errs} from "../../core/entities/error";
import HttpStatus from "http-status-codes";

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
            if (err instanceof Err || err instanceof Errs) {
                res.status(err.code).json(err);
                return;
            }
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(err);
        }
    }
    getMany = async (_: Request, res: Response): Promise<void> => {
        try {
            const link = await this.usecase.getMany();
            res.json(link);
        } catch (err) {
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}