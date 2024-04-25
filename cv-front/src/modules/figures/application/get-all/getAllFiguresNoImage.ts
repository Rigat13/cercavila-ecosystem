import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";

export async function getAllFiguresNoImage(figuraRepository: FiguraRepository): Promise<Figura[]> {
    return figuraRepository.getAllFiguresNoImage();
}