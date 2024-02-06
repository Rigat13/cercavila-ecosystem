import { Colla } from './Colla';

export interface CollaRepository {
    storeColla: (colla: Colla) => Promise<void>;
    getCollaById:(id: string) => Promise<Colla | null>;
    getCollaByName:(name: string) => Promise<Colla | null>;
    getAllCollesByName:() => Promise<Colla[]>;
    getAllCollesByFoundationYear:() => Promise<Colla[]>;
    getAllColles:() => Promise<Colla[]>;
}