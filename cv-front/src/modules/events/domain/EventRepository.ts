import {Event} from './Event';
import {User} from "@/modules/users/domain/User";

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

    getAllUsers: () => Promise<User[]>;
    updateUser: (user: User) => Promise<void>;
}