import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";

export async function getAllDigitalProductsNoImage(digitalProductRepository: DigitalProductRepository): Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProductsNoImage();
}