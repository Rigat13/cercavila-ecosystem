package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.create.CreateActivityCommand;
import cat.cercavila.cvapi.activities.application.port.out.StoreActivityPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Component
public class StoreActivityAdapter implements StoreActivityPort {
    private final ActivityRepository activityRepository;

    public StoreActivityAdapter(ActivityRepository activityRepository) { this.activityRepository = activityRepository; }

    @Override
    public void storeFigura(CreateActivityCommand createActivityCommand) {
        String imageKeyName = generateImageKeyName(createActivityCommand);
        if (!imageKeyName.equals("")) saveImageToServer(createActivityCommand.image(), imageKeyName);
        activityRepository.save(createFiguraCommand2FiguraEntity(createActivityCommand, imageKeyName));
    }

    private ActivityEntity createFiguraCommand2FiguraEntity(CreateActivityCommand createActivityCommand, String imageKey) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new Activity without an ID
        activityEntity.setName(createActivityCommand.name());
        activityEntity.setYear(createActivityCommand.year());
        activityEntity.setType(createActivityCommand.type());
        activityEntity.setImageKey(imageKey);
        activityEntity.setWebUrl(createActivityCommand.webUrl());

        return activityEntity;
    }

    private String generateImageKeyName(CreateActivityCommand createActivityCommand) {
        if (createActivityCommand.image() == null || createActivityCommand.image().isEmpty()) return "";
        String original = createActivityCommand.image().getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String figuraName = createActivityCommand.name();
        figuraName = figuraName.replaceAll("[^a-zA-Z0-9.-]", "_");
        return "image_figura_" + figuraName + "_" + UUID.randomUUID() + extension;
    }

    private void saveImageToServer(MultipartFile imageFile, String imageKeyName) {
        if (imageFile == null || imageFile.isEmpty()) return;
        try {
            Path filePath = Paths.get("/srv/cv-api/images/figures", imageKeyName);
            Files.copy(imageFile.getInputStream(), filePath);
        } catch (Exception e) { e.printStackTrace(); }
    }
}
