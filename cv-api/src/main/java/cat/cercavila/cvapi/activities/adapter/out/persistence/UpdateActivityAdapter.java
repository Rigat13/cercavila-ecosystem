package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.in.update.UpdateActivityCommand;
import cat.cercavila.cvapi.activities.application.port.out.UpdateActivityPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class UpdateActivityAdapter implements UpdateActivityPort {
    private final ActivityRepository activityRepository;

    public UpdateActivityAdapter(ActivityRepository activityRepository) { this.activityRepository = activityRepository; }

    @Override
    public void updateActivity(UpdateActivityCommand updateActivityCommand) {
        String imageKeyName = generateImageKeyName(updateActivityCommand);
        if (!imageKeyName.equals("")) {
            removeCurrentImage(updateActivityCommand);
            saveImageToServer(updateActivityCommand.image(), imageKeyName);
        }
        activityRepository.save(updateActivityCommand2ActivityEntity(updateActivityCommand, imageKeyName)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private ActivityEntity updateActivityCommand2ActivityEntity(UpdateActivityCommand updateActivityCommand, String imageKey) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(updateActivityCommand.id());
        activityEntity.setQuestion(updateActivityCommand.question());
        activityEntity.setType(updateActivityCommand.type());
        activityEntity.setImageKey(imageKey);
        activityEntity.setCorrectAnswer(updateActivityCommand.correctAnswer());
        activityEntity.setFirstIncorrectAnswer(updateActivityCommand.firstIncorrectAnswer());
        activityEntity.setSecondIncorrectAnswer(updateActivityCommand.secondIncorrectAnswer());

        return activityEntity;
    }

    private String generateImageKeyName(UpdateActivityCommand updateActivityCommand) {
        if (updateActivityCommand.image() == null || updateActivityCommand.image().isEmpty()) return "";
        String original = updateActivityCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String activityName = updateActivityCommand.question();
        activityName = activityName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_activity_" + activityName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentImage(UpdateActivityCommand updateActivityCommand) {
        String activityId = updateActivityCommand.id();

        ActivityListing currentActivityListing;
        try { currentActivityListing = activityRepository.getById(activityId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        ActivityEntity currentActivity = MapperActivityActivityEntity.activityListingToActivityEntity(currentActivityListing);

        String currentImageKey = currentActivity.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path imagePath = Paths.get("/srv/cv-api/images/activities", currentImageKey);
                Files.deleteIfExists(imagePath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/activities", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
