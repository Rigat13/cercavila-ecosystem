package cat.cercavila.cvapi.events.application.service;

import cat.cercavila.cvapi.events.application.port.in.list.EventListing;
import cat.cercavila.cvapi.events.application.port.in.list.ListEvents;
import cat.cercavila.cvapi.events.application.port.out.ListEventPort;
import cat.cercavila.cvapi.events.application.service.exception.EventNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListEventService implements ListEvents {
    private final ListEventPort listEventsPort;

    ListEventService(ListEventPort listEventsPort) { this.listEventsPort = listEventsPort; }

    @Override
    public EventListing getEventById(String id) {
        return listEventsPort.loadEventById(id)
                .orElseThrow(() -> new EventNotFound(id));
    }

    @Override
    public EventListing getEventByName(String name) {
        return listEventsPort.loadEventByName(name)
                .orElseThrow(() -> new EventNotFound(name));
    }

    @Override
    public List<EventListing> getAllEventsByName() { return listEventsPort.loadAllEventsByName(); }

    @Override
    public List<EventListing> getAllEventsByType() { return listEventsPort.loadAllEventsByType(); }

    @Override
    public List<EventListing> getAllEvents() { return listEventsPort.loadAllEvents(); }

    @Override
    public List<EventListing> getAllEventsNoImage() { return listEventsPort.loadAllEventsNoImage(); }
}
