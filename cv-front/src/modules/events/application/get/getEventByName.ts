import {Event} from "@/modules/events/domain/Event";
import {EventRepository} from "@/modules/events/domain/EventRepository";

export async function getEventByName(eventRepository : EventRepository, eventName : string) : Promise<Event | null> {
    return eventRepository.getEventByName(eventName);
}