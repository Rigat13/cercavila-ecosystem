import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User, ensureUserIsValid} from "@/modules/users/domain/User";

export async function updateUser(userRepository: UserRepository, user: User): Promise<void> {
    ensureUserIsValid(user);
    await userRepository.updateUser(user);
}
