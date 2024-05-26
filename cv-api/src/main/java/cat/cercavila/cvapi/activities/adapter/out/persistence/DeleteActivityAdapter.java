package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.delete.DeleteActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.out.DeleteActivityPort;
import org.springframework.stereotype.Component;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class DeleteActivityAdapter implements DeleteActivityPort {
    private final ActivityRepository activityRepository;

    public DeleteActivityAdapter(ActivityRepository activityRepository) { this.activityRepository = activityRepository; }

    @Override
    public void deleteFigura(DeleteActivityCommand deleteActivityCommand) {
        removeCurrentImage(deleteActivityCommand);
        activityRepository.delete(deleteFiguraCommand2FiguraEntity(deleteActivityCommand));
    }

    private ActivityEntity deleteFiguraCommand2FiguraEntity(DeleteActivityCommand deleteActivityCommand) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(deleteActivityCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the Activity
        // The other fields are not necessary for the deletion
        return activityEntity;
    }

    private void removeCurrentImage(DeleteActivityCommand deleteActivityCommand) {
        String figuraId = deleteActivityCommand.id();

        ActivityListing currentActivityListing;
        try { currentActivityListing = activityRepository.getById(figuraId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        ActivityEntity currentFigura = MapperActivityActivityEntity.figuraListingToFiguraEntity(currentActivityListing);

        String currentImageKey = currentFigura.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images/figures", currentImageKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
