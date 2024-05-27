package cat.cercavila.cvapi.event.adapter.out.persistence;

import cat.cercavila.cvapi.event.domain.Event;
import cat.cercavila.cvapi.event.application.port.in.list.EventListing;

public class MapperEventEventEntity {
    public static Event eventEntityToEvent(EventEntity eventEntity) {
        Event event = new Event(eventEntity.getName(), eventEntity.getDescription(), eventEntity.getImageKey(),
                eventEntity.getPrimaryColour(), eventEntity.getSecondaryColour(), eventEntity.getPrice(), eventEntity.getType());
        // NOTE: Created from zero, with new ID.
        return event;
    }

    public static EventEntity eventToEventEntity(Event event) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(event.getId());
        eventEntity.setName(event.getName());
        eventEntity.setDescription(event.getDescription());
        eventEntity.setImageKey(event.getImageKey());
        eventEntity.setPrimaryColour(event.getPrimaryColour());
        eventEntity.setSecondaryColour(event.getSecondaryColour());
        eventEntity.setPrice(event.getPrice());
        eventEntity.setType(event.getType());

        return eventEntity;
    }

    public static EventEntity eventListingToEventEntity(EventListing currentEventListing) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(currentEventListing.id());
        eventEntity.setName(currentEventListing.name());
        eventEntity.setDescription(currentEventListing.description());
        eventEntity.setImageKey(currentEventListing.imageKey());
        eventEntity.setPrimaryColour(currentEventListing.primaryColour());
        eventEntity.setSecondaryColour(currentEventListing.secondaryColour());
        eventEntity.setPrice(currentEventListing.price());
        eventEntity.setType(currentEventListing.type());

        return eventEntity;
    }
}
