import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";

export async function getAllFigures(figuraRepository: FiguraRepository): Promise<Figura[]> {
    return figuraRepository.getAllFigures();
}

export async function getAllFigures_collaRepo(collaRepository: CollaRepository): Promise<Figura[]> {
    return collaRepository.getAllFigures();
}