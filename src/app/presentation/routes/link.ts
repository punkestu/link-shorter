import {Router} from "express";
import {LinkController} from "../handlers/link";

export default function handler(controller: LinkController): Router {
    const router = Router();
    router.post("/", controller.createLink);
    router.get("/", controller.getMany);
    return router;
}
