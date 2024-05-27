package cat.cercavila.cvapi.event.adapter.out.persistence;

import cat.cercavila.cvapi.event.application.port.in.list.EventListing;
import cat.cercavila.cvapi.event.application.port.out.ListEventPort;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Component
public class FetchEventListingAdapter implements ListEventPort {
    EventRepository eventRepository;

    public FetchEventListingAdapter(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public Optional<EventListing> loadEventById(String id) {
        Optional<EventListing> eventListingOptional = eventRepository.getById(id);
        return eventListingOptional.map(this::createEventListingFromListing);
    }

    @Override
    public Optional<EventListing> loadEventByName(String name) {
        Optional<EventListing> eventListingOptional = eventRepository.getByName(name);
        return eventListingOptional.map(this::createEventListingFromListing);
    }

    @Override
    public List<EventListing> loadAllEventsByName() {
        List<EventListing> eventListings = eventRepository.loadAllEventsByName();
        return eventListings.stream()
                .map(this::createEventListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventListing> loadAllEventsByPrice() {
        List<EventListing> eventListings = eventRepository.loadAllEventsByPrice();
        return eventListings.stream()
                .map(this::createEventListingFromListing)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<EventListing> loadAllEventsByType() {
        List<EventListing> eventListings = eventRepository.loadAllEventsByType();
        return eventListings.stream()
                .map(this::createEventListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventListing> loadAllEvents() {
        List<EventListing> eventListings = eventRepository.findAllListing();
        return eventListings.stream()
                .map(this::createEventListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<EventListing> loadAllEventsNoImage() {
        List<EventListing> eventListings = eventRepository.findAllListing();
        return eventListings;
    }

    private EventListing createEventListingFromListing(EventListing eventListing) {
        // Fetch the image file using the imageKey
        byte[] imageBytes = (eventListing.imageKey() == null) ? null : fetchImageFromServer(eventListing.imageKey());

        // Create a EventListing object with database fields and image data
        return new EventListing(
                eventListing.id(),
                eventListing.name(),
                eventListing.description(),
                eventListing.imageKey(),
                imageBytes,
                eventListing.primaryColour(),
                eventListing.secondaryColour(),
                eventListing.price(),
                eventListing.type()
        );
    }

    private byte[] fetchImageFromServer(String imageKeyName) {
        try {
            Path directoryPath = Paths.get("/srv/cv-api/images/digitalproducts");
            if (Files.isDirectory(directoryPath)) {
                try (Stream<Path> paths = Files.list(directoryPath)) {
                    Optional<Path> imagePathOptional = paths.filter(path -> path.getFileName().toString().equals(imageKeyName)).findFirst();
                    if (imagePathOptional.isPresent()) {
                        Path imagePath = imagePathOptional.get();
                        System.out.println("IMAGE FILE PATH: " + imagePath);
                        return Files.readAllBytes(imagePath);
                    } else { System.out.println("Image file not found: " + imageKeyName); return null; }
                }
            } else { System.out.println("Directory not found: " + directoryPath); return null; }
        } catch (IOException e) { System.err.println("Error reading image file: " + e.getMessage()); e.printStackTrace(); return null; }
    }
}


