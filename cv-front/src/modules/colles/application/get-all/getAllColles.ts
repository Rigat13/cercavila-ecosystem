import {CollaRepository} from "@/modules/colles/domain/CollaRepository";
import {Colla} from "@/modules/colles/domain/Colla";
import {UserRepository} from "@/modules/users/domain/UserRepository";

export async function getAllColles(collaRepository: CollaRepository): Promise<Colla[]> {
    return collaRepository.getAllColles();
}

export async function getAllColles_userRepo(userRepository: UserRepository): Promise<Colla[]> {
    return userRepository.getAllColles();
}