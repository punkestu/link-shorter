import {LinkI} from "../interfaces/link";
import {Link} from "../entities/link";
import {ErrConflict, ErrNotFound} from "../entities/error";

export class LinkRepo implements LinkI {
    private readonly ds: Link[];

    constructor() {
        this.ds = [];
    }

    async getBySlug(slug: string): Promise<Link | null> {
        let link: Link | undefined = this.ds.find(found_link => found_link.slug === slug);
        if (!link) {
            throw new ErrNotFound("slug");
        }
        return link;
    }

    async getMany(): Promise<Link[]> {
        return this.ds;
    }

    async insert(link: Link): Promise<void> {
        const found_link: Link | undefined = this.ds.find(found_link => found_link.slug === link.slug);
        if (found_link) {
            throw new ErrConflict("slug");
        }
        this.ds.push(link);
    }
}