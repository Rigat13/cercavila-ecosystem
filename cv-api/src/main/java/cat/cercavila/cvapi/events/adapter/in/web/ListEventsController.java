package cat.cercavila.cvapi.events.adapter.in.web;

import cat.cercavila.cvapi.events.application.port.in.list.EventListing;
import cat.cercavila.cvapi.events.application.port.in.list.ListEvents;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.events.application.port.in.list.ListEvents"})
@RestController
public class ListEventsController {
    private final ListEvents listEvents;


    public ListEventsController(ListEvents listEvents) { this.listEvents = listEvents; }

    @GetMapping("/api/events/id/{id}")
    public EventListing getEventById(@PathVariable String id) { return listEvents.getEventById(id); }

    @GetMapping("/api/events/name/{name}")
    public EventListing getEventByName(@PathVariable String name) { return listEvents.getEventByName(name); }

    @GetMapping("/api/events/name")
    public List<EventListing> getAllEventsByName() { return listEvents.getAllEventsByName(); }

    @GetMapping("/api/events/type")
    public List<EventListing> getAllEventsByType() { return listEvents.getAllEventsByType(); }

    @GetMapping("/api/events")
    public List<EventListing> getAllEvents() { return listEvents.getAllEvents(); }

    @GetMapping("/api/events/noimage")
    public List<EventListing> getAllEventsNoImage() { return listEvents.getAllEventsNoImage(); }
}
