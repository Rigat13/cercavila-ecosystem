package cat.cercavila.cvapi.events.application.port.in.list;

import java.util.List;

public interface ListEvents {
    EventListing getEventById(String id);
    EventListing getEventByName(String name);
    List<EventListing> getAllEventsByName();
    List<EventListing> getAllEventsByType();
    List<EventListing> getAllEvents();
    List<EventListing> getAllEventsNoImage();
}
