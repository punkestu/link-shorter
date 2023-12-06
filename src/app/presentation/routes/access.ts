import {Router} from "express";
import {AccessController} from "../handlers/access";

export default function handler(controller: AccessController): Router {
    const router = Router();
    router.get("/:slug", controller.getLink);
    return router;
}
