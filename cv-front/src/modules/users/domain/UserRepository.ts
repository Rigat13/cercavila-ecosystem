import {User} from './User';
import {Colla} from "@/modules/colles/domain/Colla";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";

export interface UserRepository {
    storeUser: (user: User) => Promise<void>;
    getUserById:(id: string) => Promise<User | null>;
    getUserByName:(name: string) => Promise<User | null>;
    getAllUsersByName:() => Promise<User[]>;
    getAllUsers:() => Promise<User[]>;
    updateUser:(user: User) => Promise<void>;
    deleteUser:(id: string) => Promise<void>;
    getAllUserNicknames:() => Promise<string[]>;

    getAllColles:() => Promise<Colla[]>;

    getAllDigitalProducts:() => Promise<DigitalProduct[]>;
}