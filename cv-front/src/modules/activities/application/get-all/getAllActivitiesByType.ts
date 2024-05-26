import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";

export async function getAllActivitiesByType(figuraRepository: FiguraRepository): Promise<Figura[]> {
    return figuraRepository.getAllFiguresByType();
}