import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";

export async function getAllCollesByFoundationYear(collaRepository: CollaRepository): Promise<Colla[]> {
    return collaRepository.getAllCollesByFoundationYear();
}