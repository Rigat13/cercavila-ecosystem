import {EventRepository} from "@/modules/events/domain/EventRepository";
import {Event, ensureEventIsValidEmptyId} from "@/modules/events/domain/Event";

export async function storeEvent(eventRepository: EventRepository, event: Event): Promise<void> {
    ensureEventIsValidEmptyId(event);
    await eventRepository.storeEvent(event);
}
