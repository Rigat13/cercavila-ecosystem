package cat.cercavila.cvapi.events.adapter.out.persistence;

import cat.cercavila.cvapi.events.application.port.in.list.EventListing;
import cat.cercavila.cvapi.events.application.port.in.update.UpdateEventCommand;
import cat.cercavila.cvapi.events.application.port.out.UpdateEventPort;
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
        eventEntity.setType(updateEventCommand.type());
        eventEntity.setStartDate(updateEventCommand.startDate());
        eventEntity.setEndDate(updateEventCommand.endDate());
        eventEntity.setCercatrivies(updateEventCommand.cercatrivies());
        eventEntity.setFirstCoinsReward(updateEventCommand.firstCoinsReward());
        eventEntity.setFirstDigitalProductsReward(updateEventCommand.firstDigitalProductsReward());
        eventEntity.setSecondCoinsReward(updateEventCommand.secondCoinsReward());
        eventEntity.setSecondDigitalProductsReward(updateEventCommand.secondDigitalProductsReward());
        eventEntity.setThirdCoinsReward(updateEventCommand.thirdCoinsReward());
        eventEntity.setThirdDigitalProductsReward(updateEventCommand.thirdDigitalProductsReward());
        eventEntity.setFourthTenthCoinsReward(updateEventCommand.fourthTenthCoinsReward());
        eventEntity.setFourthTenthDigitalProductsReward(updateEventCommand.fourthTenthDigitalProductsReward());
        eventEntity.setAllCoinsReward(updateEventCommand.allCoinsReward());
        eventEntity.setAllDigitalProductsReward(updateEventCommand.allDigitalProductsReward());

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
                Path imagePath = Paths.get("/srv/cv-api/images/events", currentImageKey);
                Files.deleteIfExists(imagePath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/events", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
