import {User} from './User';
import {Figura} from "@/modules/figures/domain/Figura";

export interface UserRepository {
    storeUser: (user: User) => Promise<void>;
    getUserById:(id: string) => Promise<User | null>;
    getUserByName:(name: string) => Promise<User | null>;
    getAllUsersByName:() => Promise<User[]>;
    getAllUsers:() => Promise<User[]>;
    updateUser:(user: User) => Promise<void>;
    deleteUser:(id: string) => Promise<void>;
    getAllUserNicknames:() => Promise<string[]>;
}