import {User} from "@/modules/users/domain/User";
import {UserRepository} from "@/modules/users/domain/UserRepository";

export async function getUserByName(userRepository : UserRepository, userName : string) : Promise<User | null> {
    return userRepository.getUserByName(userName);
}