package cat.cercavila.cvapi.event.adapter.out.persistence;

import cat.cercavila.cvapi.event.application.port.in.create.CreateEventCommand;
import cat.cercavila.cvapi.event.application.port.out.StoreEventPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class StoreEventAdapter implements StoreEventPort {
    private final EventRepository eventRepository;

    public StoreEventAdapter(EventRepository eventRepository) { this.eventRepository = eventRepository; }

    @Override
    public void storeEvent(CreateEventCommand createEventCommand) {
        String imageKeyName = generateImageKeyName(createEventCommand);
        if (!imageKeyName.equals("")) saveImageToServer(createEventCommand.image(), imageKeyName);
        eventRepository.save(createEventCommand2EventEntity(createEventCommand, imageKeyName));
    }

    private EventEntity createEventCommand2EventEntity(CreateEventCommand createEventCommand, String imageKey) {
        EventEntity eventEntity = new EventEntity();
        eventEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new Event without an ID
        eventEntity.setName(createEventCommand.name());
        eventEntity.setDescription(createEventCommand.description());
        eventEntity.setImageKey(imageKey);
        eventEntity.setPrimaryColour(createEventCommand.primaryColour());
        eventEntity.setSecondaryColour(createEventCommand.secondaryColour());
        eventEntity.setPrice(createEventCommand.price());
        eventEntity.setType(createEventCommand.type());

        return eventEntity;
    }

    private String generateImageKeyName(CreateEventCommand createEventCommand) {
        if (createEventCommand.image() == null || createEventCommand.image().isEmpty()) return "";
        String original = createEventCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String eventName = createEventCommand.name();
        eventName = eventName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_event_" + eventName + "_" + UUID.randomUUID() + extension;
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/digitalproducts", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
