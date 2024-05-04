import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

export async function getAllDigitalProductsByPrice(digitalProductRepository: DigitalProductRepository): Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProductsByPrice();
}