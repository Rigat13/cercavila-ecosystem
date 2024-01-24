import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla, ensureCollaIsValid} from "@/modules/colles/domain/Colla";

export async function createColla(
    collaRepository: CollaRepository,
    colla: Colla
): Promise<void> {
    ensureCollaIsValid(colla);

    await collaRepository.save(colla);
}
