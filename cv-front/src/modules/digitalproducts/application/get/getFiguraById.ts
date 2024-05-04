import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";
import {Figura} from "@/modules/figures/domain/Figura";

export async function getFiguraById(figuraRepository : FiguraRepository, figuraId : string) : Promise<Figura | null> {
    return figuraRepository.getFiguraById(figuraId);
}