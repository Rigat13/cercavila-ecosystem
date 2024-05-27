import {EventRepository} from "@/modules/events/domain/EventRepository";
import {Event, ensureEventIsValid} from "@/modules/events/domain/Event";

export async function updateEvent(eventRepository: EventRepository, event: Event): Promise<void> {
    ensureEventIsValid(event);
    await eventRepository.updateEvent(event);
}
