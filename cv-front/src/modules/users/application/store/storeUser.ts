import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User, ensureUserIsValidEmptyId} from "@/modules/users/domain/User";

export async function storeUser(userRepository: UserRepository, user: User): Promise<void> {
    ensureUserIsValidEmptyId(user);
    await userRepository.storeUser(user);
}
