import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla, ensureCollaIsValidEmptyId} from "@/modules/colles/domain/Colla";

export async function storeColla(collaRepository: CollaRepository, colla: Colla): Promise<void> {
    ensureCollaIsValidEmptyId(colla);
    await collaRepository.storeColla(colla);
}
