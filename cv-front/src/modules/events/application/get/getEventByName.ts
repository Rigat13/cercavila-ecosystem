import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";

export async function getEventByName(digitalProductRepository : DigitalProductRepository, digitalProductName : string) : Promise<DigitalProduct | null> {
    return digitalProductRepository.getDigitalProductByName(digitalProductName);
}