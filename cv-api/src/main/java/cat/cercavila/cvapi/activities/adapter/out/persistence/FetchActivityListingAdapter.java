package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.out.ListActivityPort;
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
public class FetchActivityListingAdapter implements ListActivityPort {
    ActivityRepository activityRepository;

    public FetchActivityListingAdapter(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public Optional<ActivityListing> loadActivityById(String id) {
        Optional<ActivityListing> activityListingOptional = activityRepository.getById(id);
        return activityListingOptional.map(this::createActivityListingFromListing);
    }

    @Override
    public Optional<ActivityListing> loadActivityByQuestion(String name) {
        Optional<ActivityListing> activityListingOptional = activityRepository.getByQuestion(name);
        return activityListingOptional.map(this::createActivityListingFromListing);
    }

    @Override
    public List<ActivityListing> loadAllActivitiesByQuestion() {
        List<ActivityListing> activityListings = activityRepository.loadAllActivitiesByQuestion();
        return activityListings.stream()
                .map(this::createActivityListingFromListing)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<ActivityListing> loadAllActivitiesByType() {
        List<ActivityListing> activityListings = activityRepository.loadAllActivitiesByType();
        return activityListings.stream()
                .map(this::createActivityListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<ActivityListing> loadAllActivities() {
        List<ActivityListing> activityListings = activityRepository.findAllListing();
        return activityListings.stream()
                .map(this::createActivityListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<ActivityListing> loadAllActivitiesNoImage() {
        List<ActivityListing> activityListings = activityRepository.findAllListing();
        return activityListings;
    }

    private ActivityListing createActivityListingFromListing(ActivityListing activityListing) {
        // Fetch the image file using the imageKey
        byte[] imageBytes = (activityListing.imageKey() == null) ? null : fetchImageFromServer(activityListing.imageKey());

        // Create a ActivityListing object with database fields and image data
        return new ActivityListing(
                activityListing.id(),
                activityListing.question(),
                activityListing.type(),
                activityListing.imageKey(),
                imageBytes,
                activityListing.correctAnswer(),
                activityListing.firstIncorrectAnswer(),
                activityListing.secondIncorrectAnswer()
        );
    }

    private byte[] fetchImageFromServer(String imageKeyName) {
        try {
            Path directoryPath = Paths.get("/srv/cv-api/images/activities");
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


