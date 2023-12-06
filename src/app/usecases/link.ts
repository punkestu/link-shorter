import {LinkI} from "../core/interfaces/link";
import {Link} from "../core/entities/link";
import {ErrNotFound, Errs} from "../core/entities/error";
import Validator from "validatorjs";
import HttpStatus from "http-status-codes";

type CreateLink = {
    slug: string,
    url: string
};

export class LinkUseCase {
    private repo: LinkI;

    constructor(linkRepo: LinkI) {
        this.repo = linkRepo;
    }

    async createLink(param: CreateLink): Promise<void> {
        const slugs = await this.repo.getMany().then(links => {
            return links.map(link => link.slug)
        });
        const validation = new Validator(param, {
            url: "required|url",
            slug: ["required", {
                "not_in": ["links", ...slugs]
            }]
        }, {
            url: "must be a url",
            required: "required",
            not_in: "value is used"
        });
        if (!validation.check()) {
            throw new Errs(HttpStatus.BAD_REQUEST, validation.errors.all());
        }
        return this.repo.insert(param);
    }

    async getLink(slug: string): Promise<Link> {
        const found_link = await this.repo.getBySlug(slug);
        if (!found_link) {
            throw new ErrNotFound("slug parameter");
        }
        return found_link;
    }

    getMany(): Promise<Link[]> {
        return this.repo.getMany();
    }
}