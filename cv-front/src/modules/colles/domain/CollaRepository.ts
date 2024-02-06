import { Colla } from './Colla';

export interface CollaRepository {
    storeColla(colla: Colla): Promise<void>;
    getCollaById(id: string): Promise<Colla | null>;
    getCollaByName(name: string): Promise<Colla | null>;
    getAllCollesByName(name: string): Promise<Colla[]>;
    getAllCollesByFoundationYear(year: number): Promise<Colla[]>;
    getAllColles(): Promise<Colla[]>;
}