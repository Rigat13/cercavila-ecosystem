import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";

export async function getDigitalProductByName(digitalProductRepository : DigitalProductRepository, digitalProductName : string) : Promise<DigitalProduct | null> {
    return digitalProductRepository.getDigitalProductByName(digitalProductName);
}