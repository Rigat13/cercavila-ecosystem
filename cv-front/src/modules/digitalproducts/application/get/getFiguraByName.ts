import {Figura} from "@/modules/figures/domain/Figura";
import {FiguraRepository} from "@/modules/figures/domain/FiguraRepository";

export async function getFiguraByName(figuraRepository : FiguraRepository, figuraName : string) : Promise<Figura | null> {
    return figuraRepository.getFiguraByName(figuraName);
}