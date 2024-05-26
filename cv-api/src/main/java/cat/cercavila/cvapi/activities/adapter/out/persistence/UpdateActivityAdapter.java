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
    public void updateFigura(UpdateActivityCommand updateActivityCommand) {
        String imageKeyName = generateImageKeyName(updateActivityCommand);
        if (!imageKeyName.equals("")) {
            removeCurrentImage(updateActivityCommand);
            saveImageToServer(updateActivityCommand.image(), imageKeyName);
        }
        activityRepository.save(updateFiguraCommand2FiguraEntity(updateActivityCommand, imageKeyName)); // NOTE: save does not mean "create"; if it exists, it will update
    }

    private ActivityEntity updateFiguraCommand2FiguraEntity(UpdateActivityCommand updateActivityCommand, String imageKey) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(updateActivityCommand.id());
        activityEntity.setName(updateActivityCommand.name());
        activityEntity.setYear(updateActivityCommand.year());
        activityEntity.setType(updateActivityCommand.type());
        activityEntity.setImageKey(imageKey);
        activityEntity.setWebUrl(updateActivityCommand.webUrl());

        return activityEntity;
    }

    private String generateImageKeyName(UpdateActivityCommand updateActivityCommand) {
        if (updateActivityCommand.image() == null || updateActivityCommand.image().isEmpty()) return "";
        String original = updateActivityCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String figuraName = updateActivityCommand.name();
        figuraName = figuraName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_figura_" + figuraName + "_" + UUID.randomUUID() + extension;
    }

    private void removeCurrentImage(UpdateActivityCommand updateActivityCommand) {
        String figuraId = updateActivityCommand.id();

        ActivityListing currentActivityListing;
        try { currentActivityListing = activityRepository.getById(figuraId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        ActivityEntity currentFigura = MapperActivityActivityEntity.figuraListingToFiguraEntity(currentActivityListing);

        String currentImageKey = currentFigura.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path imagePath = Paths.get("/srv/cv-api/images/figures", currentImageKey);
                Files.deleteIfExists(imagePath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/figures", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
