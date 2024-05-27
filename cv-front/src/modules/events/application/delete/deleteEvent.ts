import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {ensureDigitalProductIdIsValid} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function deleteEvent(digitalProductRepository: DigitalProductRepository, digitalProductId : string): Promise<void> {
    ensureDigitalProductIdIsValid(digitalProductId);
    await digitalProductRepository.deleteDigitalProduct(digitalProductId);
}
