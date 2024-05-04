import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function getDigitalProductById(digitalProductRepository : DigitalProductRepository, digitalProductId : string) : Promise<DigitalProduct | null> {
    return digitalProductRepository.getDigitalProductById(digitalProductId);
}