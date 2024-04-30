import {Colla} from './Colla';
import {Figura} from "@/modules/figures/domain/Figura";

export interface CollaRepository {
    storeColla: (colla: Colla) => Promise<void>;
    getCollaById:(id: string) => Promise<Colla | null>;
    getCollaByName:(name: string) => Promise<Colla | null>;
    getAllCollesByName:() => Promise<Colla[]>;
    getAllCollesByFoundationYear:() => Promise<Colla[]>;
    getAllColles:() => Promise<Colla[]>;
    updateColla:(colla: Colla) => Promise<void>;
    deleteColla:(id: string) => Promise<void>;

    getAllFiguresNoImage:() => Promise<Figura[]>;
    getAllFigures:() => Promise<Figura[]>;
}