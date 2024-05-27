import {Event} from './DigitalProduct';
import {User} from "@/modules/users/domain/User";

export interface EventRepository {
    storeDigitalProduct: (digitalProducts: Event) => Promise<void>;
    getDigitalProductById:(id: string) => Promise<Event | null>;
    getDigitalProductByName:(name: string) => Promise<Event | null>;
    getAllDigitalProductsByName:() => Promise<Event[]>;
    getAllDigitalProductsByPrice:() => Promise<Event[]>;
    getAllDigitalProductsByType:() => Promise<Event[]>;
    getAllDigitalProducts:() => Promise<Event[]>;
    getAllDigitalProductsNoImage:() => Promise<Event[]>;
    updateDigitalProduct:(digitalProducts: Event) => Promise<void>;
    deleteDigitalProduct:(id: string) => Promise<void>;

    getAllUsers: () => Promise<User[]>;
    updateUser: (user: User) => Promise<void>;
}