import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";

export async function getAllFiguresByType(figuraRepository: FiguraRepository): Promise<Figura[]> {
    return figuraRepository.getAllFiguresByType();
}