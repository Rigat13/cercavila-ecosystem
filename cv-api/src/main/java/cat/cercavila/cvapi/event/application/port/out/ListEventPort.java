package cat.cercavila.cvapi.event.application.port.out;

import cat.cercavila.cvapi.event.application.port.in.list.EventListing;

import java.util.List;
import java.util.Optional;

public interface ListEventPort {
    Optional<EventListing> loadEventById(String id);
    Optional<EventListing> loadEventByName(String name);

    List<EventListing> loadAllEventsByName();
    List<EventListing> loadAllEventsByPrice();
    List<EventListing> loadAllEventsByType();
    List<EventListing> loadAllEvents();
    List<EventListing> loadAllEventsNoImage();
}
