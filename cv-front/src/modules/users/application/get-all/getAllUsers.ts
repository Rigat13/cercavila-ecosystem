import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User} from "@/modules/users/domain/User";
import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";
import {EventRepository} from "@/modules/events/domain/EventRepository";

export async function getAllUsers(userRepository: UserRepository): Promise<User[]> {
    return userRepository.getAllUsers();
}

export async function getAllUsers_digiProduRepo(digitalProductRepo: DigitalProductRepository): Promise<User[]> {
    return digitalProductRepo.getAllUsers();
}

export async function getAllUsers_eventRepo(eventRepository: EventRepository): Promise<User[]> {
    return eventRepository.getAllUsers();
}