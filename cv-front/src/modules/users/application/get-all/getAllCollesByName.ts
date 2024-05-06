import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";

export async function getCollaByName(collaRepository : CollaRepository) : Promise<Colla[]> {
    return collaRepository.getAllCollesByName();
}