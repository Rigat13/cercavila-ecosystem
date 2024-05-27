import {EventRepository} from "@/modules/events/domain/EventRepository";
import {ensureEventIdIsValid} from "@/modules/events/domain/Event";

export async function deleteEvent(eventRepository: EventRepository, eventId : string): Promise<void> {
    ensureEventIdIsValid(eventId);
    await eventRepository.deleteEvent(eventId);
}
