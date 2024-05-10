import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User} from "@/modules/users/domain/User";

export async function getAllUserNicknames(userRepository: UserRepository): Promise<string[]> {
    return userRepository.getAllUserNicknames();
}