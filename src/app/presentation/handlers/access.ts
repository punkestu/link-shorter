import {Request, Response} from "express";
import {Err} from "../../core/entities/error";
import {LinkUseCase} from "../../usecases/link";
import HttpStatus from "http-status-codes";

export class AccessController {
    private usecase: LinkUseCase;

    constructor(linkUsecase: LinkUseCase) {
        this.usecase = linkUsecase;
    }

    getLink = async (req: Request, res: Response): Promise<void> => {
        try {
            const {slug: link_slug} = req.params;
            const link = await this.usecase.getLink(link_slug);
            res.redirect(link.url);
        } catch (err) {
            if (err instanceof Err) {
                res.status(err.code).json(err);
                return;
            }
            res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}