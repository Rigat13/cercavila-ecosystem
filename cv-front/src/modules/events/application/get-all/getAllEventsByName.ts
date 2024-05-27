import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function getDigitalProductByName(digitalProductRepository : DigitalProductRepository) : Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProductsByName();
}