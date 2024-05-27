package cat.cercavila.cvapi.event.adapter.in.web;

import cat.cercavila.cvapi.event.application.port.in.list.EventListing;
import cat.cercavila.cvapi.event.application.port.in.list.ListEvents;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.digitalproducts.application.port.in.list.ListEvents"})
@RestController
public class ListEventsController {
    private final ListEvents listEvents;


    public ListEventsController(ListEvents listEvents) { this.listEvents = listEvents; }

    @GetMapping("/api/digitalproducts/id/{id}")
    public EventListing getEventById(@PathVariable String id) { return listEvents.getEventById(id); }

    @GetMapping("/api/digitalproducts/name/{name}")
    public EventListing getEventByName(@PathVariable String name) { return listEvents.getEventByName(name); }

    @GetMapping("/api/digitalproducts/name")
    public List<EventListing> getAllEventsByName() { return listEvents.getAllEventsByName(); }

    @GetMapping("/api/digitalproducts/price")
    public List<EventListing> getAllEventsByPrice() { return listEvents.getAllEventsByPrice(); }

    @GetMapping("/api/digitalproducts/type")
    public List<EventListing> getAllEventsByType() { return listEvents.getAllEventsByType(); }

    @GetMapping("/api/digitalproducts")
    public List<EventListing> getAllEvents() { return listEvents.getAllEvents(); }

    @GetMapping("/api/digitalproducts/noimage")
    public List<EventListing> getAllEventsNoImage() { return listEvents.getAllEventsNoImage(); }
}
