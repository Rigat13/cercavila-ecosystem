import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function getAllDigitalProductsByType(digitalProductRepository: DigitalProductRepository): Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProductsByType();
}