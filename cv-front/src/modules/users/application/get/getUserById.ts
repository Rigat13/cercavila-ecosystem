import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User} from "@/modules/users/domain/User";

export async function getUserById(userRepository : UserRepository, userId : string) : Promise<User | null> {
    return userRepository.getUserById(userId);
}