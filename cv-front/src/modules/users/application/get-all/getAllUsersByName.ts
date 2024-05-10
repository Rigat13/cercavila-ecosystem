import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User} from "@/modules/users/domain/User";

export async function getUserByName(userRepository : UserRepository) : Promise<User[]> {
    return userRepository.getAllUsersByName();
}