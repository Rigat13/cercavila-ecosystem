import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";

export async function getAllFiguresNoImage(figuraRepository: FiguraRepository): Promise<Figura[]> {
    return figuraRepository.getAllFiguresNoImage();
}

export async function getAllFiguresNoImage_collaRepo(collaRepository: CollaRepository): Promise<Figura[]> {
    return collaRepository.getAllFiguresNoImage();
}