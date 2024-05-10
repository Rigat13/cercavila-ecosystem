import {UserRepository} from "@/modules/users/domain/UserRepository";
import {ensureUserIdIsValid} from "@/modules/users/domain/User";

export async function deleteUser(userRepository: UserRepository, userId : string): Promise<void> {
    ensureUserIdIsValid(userId);
    await userRepository.deleteUser(userId);
}
