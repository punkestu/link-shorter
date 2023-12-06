import {LinkI} from "../interfaces/link";
import {Link} from "../entities/link";
import {ErrConflict} from "../entities/error";

export class LinkRepo implements LinkI {
    private readonly ds: Link[];

    constructor() {
        this.ds = [];
    }

    async getBySlug(slug: string): Promise<Link | null> {
        let link = this.ds.find(found_link => found_link.slug === slug);
        return !link ? null : link;
    }

    async getMany(): Promise<Link[]> {
        return this.ds;
    }

    async insert(link: Link): Promise<void> {
        this.ds.push(link);
    }
}