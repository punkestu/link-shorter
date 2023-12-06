import {LinkI} from "../core/interfaces/link";
import {Link} from "../core/entities/link";

type CreateLink = {
    slug: string,
    url: string
};

export class LinkUseCase {
    private repo: LinkI;

    constructor(linkRepo: LinkI) {
        this.repo = linkRepo;
    }

    createLink(param: CreateLink): Promise<void> {
        return this.repo.insert(param);
    }

    getLink(slug: string): Promise<Link | null> {
        return this.repo.getBySlug(slug);
    }
    getMany(): Promise<Link[]> {
        return this.repo.getMany();
    }
}