package cat.cercavila.cvapi.event.adapter.out.persistence;

import cat.cercavila.cvapi.event.application.port.in.list.EventListing;
import cat.cercavila.cvapi.event.application.port.in.update.UpdateEventCommand;
import cat.cercavila.cvapi.event.application.port.out.UpdateEventPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UpdateEventAdapter implements UpdateEventPort {
    private final EventRepository eventRepository;

    public UpdateEventAdapter(EventRepository eventRepository) { this.eventRepository = eventRepository; }

    @Override
    public void updateEvent(UpdateEventCommand updateEventCommand) {
        String imageKeyName = generateImageKeyName(updateEventCommand);
        if (!imageKeyName.equals("")) {
            removeCurrentImage(updateEventCommand);
            saveImageToServer(updateEventCommand.image(), imageKeyName);
        }

        eventRepository.save(updateEventCommand2EventEntity(updateEventCommand, imageKeyName)); // NOTE: save does not mean "create"; if it exists, it will update

    }

    private EventEntity updateEventCommand2EventEntity(UpdateEventCommand updateEventCommand, String imageKey) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(updateEventCommand.id());
        eventEntity.setName(updateEventCommand.name());
        eventEntity.setDescription(updateEventCommand.description());
        eventEntity.setImageKey(imageKey);
        eventEntity.setPrimaryColour(updateEventCommand.primaryColour());
        eventEntity.setSecondaryColour(updateEventCommand.secondaryColour());
        eventEntity.setPrice(updateEventCommand.price());
        eventEntity.setType(updateEventCommand.type());

        return eventEntity;
    }

    private String generateImageKeyName(UpdateEventCommand updateEventCommand) {
        if (updateEventCommand.image() == null || updateEventCommand.image().isEmpty()) return "";

        String original = updateEventCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String eventName = updateEventCommand.name();
        eventName = eventName.replaceAll("[^a-zA-Z0-9.-]", "_");

        return "image_event_" + eventName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentImage(UpdateEventCommand updateEventCommand) {
        String eventId = updateEventCommand.id();

        EventListing currentEventListing;
        try { currentEventListing = eventRepository.getById(eventId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        EventEntity currentEvent = MapperEventEventEntity.eventListingToEventEntity(currentEventListing);

        String currentImageKey = currentEvent.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path imagePath = Paths.get("/srv/cv-api/images/digitalproducts", currentImageKey);
                Files.deleteIfExists(imagePath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/digitalproducts", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
