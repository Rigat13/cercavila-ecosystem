import {UserRepository} from "@/modules/users/domain/UserRepository";
import {User, ensureUserIsValid} from "@/modules/users/domain/User";
import {DigitalProductRepository} from "@/modules/digitalproducts/domain/DigitalProductRepository";

export async function updateUser(userRepository: UserRepository, user: User): Promise<void> {
    try {
        await ensureUserIsValid(user);
        await userRepository.updateUser(user);
    } catch (e) { throw new Error("L'error d'actualització d'usuari és: "+e); }
}

export async function updateUser_digiProduRepo(digitalProductRepository: DigitalProductRepository, user: User): Promise<void> {
    try {
        await ensureUserIsValid(user);
        await digitalProductRepository.updateUser(user);
    } catch (e) { throw new Error("L'error d'actualització d'usuari és: "+e); }
}