import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {ensureFiguraIdIsValid} from "@/modules/figures/domain/Figura";

export async function deleteActivity(figuraRepository: FiguraRepository, figuraId : string): Promise<void> {
    ensureFiguraIdIsValid(figuraId);
    await figuraRepository.deleteFigura(figuraId);
}
