import {EventRepository} from "@/modules/events/domain/EventRepository";
import {Event} from "@/modules/events/domain/Event";

export async function getAllEventsByType(eventRepository: EventRepository): Promise<Event[]> {
    return eventRepository.getAllEventsByType();
}