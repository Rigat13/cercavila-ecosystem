import {Colla} from "@/modules/colles/domain/Colla";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";

export async function getCollaByName(collaRepository : CollaRepository, collaName : string) : Promise<Colla | null> {
    return collaRepository.getCollaByName(collaName);
}