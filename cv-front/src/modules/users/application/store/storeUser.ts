import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User, ensureUserIsValidEmptyId} from "@/modules/users/domain/User";

export async function storeUser(userRepository: UserRepository, user: User): Promise<void> {
    try {
        await ensureUserIsValidEmptyId(user);
        await userRepository.storeUser(user);
    } catch (e) { throw new Error("L'error de desat d'usuari és: "+e); }
}
