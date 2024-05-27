import {EventRepository} from "@/modules/events/domain/EventRepository";
import {Event} from "@/modules/events/domain/Event";

export async function getEventById(eventRepository : EventRepository, eventId : string) : Promise<Event | null> {
    return eventRepository.getEventById(eventId);
}