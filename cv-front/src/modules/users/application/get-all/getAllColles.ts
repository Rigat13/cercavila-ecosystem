import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";

export async function getAllColles(collaRepository: CollaRepository): Promise<Colla[]> {
    return collaRepository.getAllColles();
}