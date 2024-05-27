package cat.cercavila.cvapi.event.adapter.out.persistence;

import cat.cercavila.cvapi.event.application.port.in.delete.DeleteEventCommand;
import cat.cercavila.cvapi.event.application.port.in.list.EventListing;
import cat.cercavila.cvapi.event.application.port.out.DeleteEventPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteEventAdapter implements DeleteEventPort {
    private final EventRepository eventRepository;

    public DeleteEventAdapter(EventRepository eventRepository) { this.eventRepository = eventRepository; }

    @Override
    public void deleteEvent(DeleteEventCommand deleteEventCommand) {
        removeCurrentImage(deleteEventCommand);
        eventRepository.delete(deleteEventCommand2EventEntity(deleteEventCommand));
    }

    private EventEntity deleteEventCommand2EventEntity(DeleteEventCommand deleteEventCommand) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(deleteEventCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the Event
        // The other fields are not necessary for the deletion
        return eventEntity;
    }

    private void removeCurrentImage(DeleteEventCommand deleteEventCommand) {
        String eventId = deleteEventCommand.id();

        EventListing currentEventListing;
        try { currentEventListing = eventRepository.getById(eventId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        EventEntity currentEvent = MapperEventEventEntity.eventListingToEventEntity(currentEventListing);

        String currentImageKey = currentEvent.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images/digitalproducts", currentImageKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
