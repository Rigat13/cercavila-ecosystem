import {Figura} from './Figura';

export interface FiguraRepository {
    storeFigura: (figura: Figura) => Promise<void>;
    getFiguraById:(id: string) => Promise<Figura | null>;
    getFiguraByName:(name: string) => Promise<Figura | null>;
    getAllFiguresByName:() => Promise<Figura[]>;
    getAllFiguresByYear:() => Promise<Figura[]>;
    getAllFiguresByType:() => Promise<Figura[]>;
    getAllFigures:() => Promise<Figura[]>;
    updateFigura:(figura: Figura) => Promise<void>;
    deleteFigura:(id: string) => Promise<void>;
}