import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User} from "@/modules/users/domain/User";

export async function getAllUsers(userRepository: UserRepository): Promise<User[]> {
    return userRepository.getAllUsers();
}