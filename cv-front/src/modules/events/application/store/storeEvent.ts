import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct, ensureDigitalProductIsValidEmptyId} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function storeEvent(digitalProductRepository: DigitalProductRepository, digitalProduct: DigitalProduct): Promise<void> {
    ensureDigitalProductIsValidEmptyId(digitalProduct);
    await digitalProductRepository.storeDigitalProduct(digitalProduct);
}
