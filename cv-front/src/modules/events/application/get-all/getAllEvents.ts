import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {UserRepository} from "@/modules/users/domain/UserRepository";

export async function getAllEvents(digitalProductRepository: DigitalProductRepository): Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProducts();
}

export async function getAllDigitalProducts_userRepo (userRepository: UserRepository): Promise<DigitalProduct[]> {
    return userRepository.getAllDigitalProducts();
}