import { Colla } from './Colla';

export interface CollaRepository {
    save(colla: Colla): Promise<void>;
    get(id: string): Promise<Colla | null>;
    getAll(): Promise<Colla[]>;
}