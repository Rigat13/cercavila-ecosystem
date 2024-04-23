import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura, ensureFiguraIsValid} from "@/modules/figures/domain/Figura";

export async function updateFigura(figuraRepository: FiguraRepository, figura: Figura): Promise<void> {
    ensureFiguraIsValid(figura);
    await figuraRepository.updateFigura(figura);
}
