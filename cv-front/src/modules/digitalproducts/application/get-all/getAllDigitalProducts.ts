import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {UserRepository} from "@/modules/users/domain/UserRepository";
import {EventRepository} from "@/modules/events/domain/EventRepository";

export async function getAllDigitalProducts(digitalProductRepository: DigitalProductRepository): Promise<DigitalProduct[]> {
    return digitalProductRepository.getAllDigitalProducts();
}

export async function getAllDigitalProducts_userRepo (userRepository: UserRepository): Promise<DigitalProduct[]> {
    return userRepository.getAllDigitalProducts();
}

export async function getAllDigitalProducts_eventRepo (eventRepository: EventRepository): Promise<DigitalProduct[]> {
    return eventRepository.getAllDigitalProducts();
}