import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura, ensureFiguraIsValidEmptyId} from "@/modules/figures/domain/Figura";

export async function storeActivity(figuraRepository: FiguraRepository, figura: Figura): Promise<void> {
    ensureFiguraIsValidEmptyId(figura);
    await figuraRepository.storeFigura(figura);
}
