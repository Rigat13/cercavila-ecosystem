import {EventRepository} from "@/modules/events/domain/EventRepository";
import {Event} from "@/modules/events/domain/Event";

export async function getAllEventsNoImage(eventRepository: EventRepository): Promise<Event[]> {
    return eventRepository.getAllEventsNoImage();
}