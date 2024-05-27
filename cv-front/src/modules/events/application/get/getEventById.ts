import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function getEventById(digitalProductRepository : DigitalProductRepository, digitalProductId : string) : Promise<DigitalProduct | null> {
    return digitalProductRepository.getDigitalProductById(digitalProductId);
}