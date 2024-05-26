import {Activity} from './Figura';

export interface ActivityRepository {
    storeFigura: (figura: Activity) => Promise<void>;
    getFiguraById:(id: string) => Promise<Activity | null>;
    getFiguraByName:(name: string) => Promise<Activity | null>;
    getAllFiguresByName:() => Promise<Activity[]>;
    getAllFiguresByYear:() => Promise<Activity[]>;
    getAllFiguresByType:() => Promise<Activity[]>;
    getAllFigures:() => Promise<Activity[]>;
    getAllFiguresNoImage:() => Promise<Activity[]>;
    updateFigura:(figura: Activity) => Promise<void>;
    deleteFigura:(id: string) => Promise<void>;
}