import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {ensureCollaIdIsValid} from "@/modules/colles/domain/Colla";

export async function deleteColla(collaRepository: CollaRepository, collaId : string): Promise<void> {
    ensureCollaIdIsValid(collaId);
    await collaRepository.deleteColla(collaId);
}
