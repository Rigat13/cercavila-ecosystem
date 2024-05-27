import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";

export async function getAllEventsNoImage(digitalProductRepository: DigitalProductRepository): Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProductsNoImage();
}