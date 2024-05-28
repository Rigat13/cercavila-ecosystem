import {Event} from './Event';
import {User} from "@/modules/users/domain/User";
import {DigitalProduct} from "@/modules/digitalproducts/domain/DigitalProduct";
import {Activity} from "@/modules/activities/domain/Activity";

export interface EventRepository {
    storeEvent: (events: Event) => Promise<void>;
    getEventById:(id: string) => Promise<Event | null>;
    getEventByName:(name: string) => Promise<Event | null>;
    getAllEventsByName:() => Promise<Event[]>;
    getAllEventsByType:() => Promise<Event[]>;
    getAllEvents:() => Promise<Event[]>;
    getAllEventsNoImage:() => Promise<Event[]>;
    updateEvent:(events: Event) => Promise<void>;
    deleteEvent:(id: string) => Promise<void>;

    getAllActivitiesNoImage: () => Promise<Activity[]>;
    getAllDigitalProducts: () => Promise<DigitalProduct[]>;

    getAllUsers: () => Promise<User[]>;
    updateUser: (user: User) => Promise<void>;
}