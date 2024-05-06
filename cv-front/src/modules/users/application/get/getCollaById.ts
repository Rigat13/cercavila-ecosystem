import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";

export async function getCollaById(collaRepository : CollaRepository, collaId : string) : Promise<Colla | null> {
    return collaRepository.getCollaById(collaId);
}