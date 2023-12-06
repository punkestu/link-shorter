import {Link} from "../entities/link";

export interface LinkI {
    getBySlug(slug: string): Promise<Link | null>
    getMany(): Promise<Link[]>
    insert(link: Link): Promise<void>
}