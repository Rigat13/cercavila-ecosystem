import {Colla, CollaFromApi} from './Colla';

export interface CollaRepository {
    storeColla: (colla: Colla) => Promise<void>;
    getCollaById:(id: string) => Promise<CollaFromApi | null>;
    getCollaByName:(name: string) => Promise<CollaFromApi | null>;
    getAllCollesByName:() => Promise<CollaFromApi[]>;
    getAllCollesByFoundationYear:() => Promise<CollaFromApi[]>;
    getAllColles:() => Promise<CollaFromApi[]>;
    updateColla:(colla: Colla) => Promise<void>;
    deleteColla:(id: string) => Promise<void>;
}