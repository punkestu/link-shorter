import Express from "express";
import {LinkRepo} from "../app/core/repositories/link_local";
import {LinkUseCase} from "../app/usecases/link";
import {LinkController} from "../app/presentation/handlers/link";
import {AccessController} from "../app/presentation/handlers/access";
import Link from "../app/presentation/routes/link";
import Access from "../app/presentation/routes/access";

const app = Express();

const linkRepo = new LinkRepo();
const linkUsecase = new LinkUseCase(linkRepo);
const linkController = new LinkController(linkUsecase);
const accessController = new AccessController(linkUsecase);

app.use(Express.json());
app.use("/links", Link(linkController));
app.use("/", Access(accessController));
app.use((_, res) => {
    res.sendStatus(404)
})

export default app;