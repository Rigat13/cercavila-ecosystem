import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct, ensureDigitalProductIsValid} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function updateDigitalProduct(digitalProductRepository: DigitalProductRepository, digitalProduct: DigitalProduct): Promise<void> {
    ensureDigitalProductIsValid(digitalProduct);
    await digitalProductRepository.updateDigitalProduct(digitalProduct);
}
