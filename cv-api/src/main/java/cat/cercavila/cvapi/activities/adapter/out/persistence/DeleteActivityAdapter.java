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
    public void deleteActivity(DeleteActivityCommand deleteActivityCommand) {
        removeCurrentImage(deleteActivityCommand);
        activityRepository.delete(deleteActivityCommand2ActivityEntity(deleteActivityCommand));
    }

    private ActivityEntity deleteActivityCommand2ActivityEntity(DeleteActivityCommand deleteActivityCommand) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(deleteActivityCommand.id()); // IMPORTANT: Here, an existing ID is used to delete the Activity
        // The other fields are not necessary for the deletion
        return activityEntity;
    }

    private void removeCurrentImage(DeleteActivityCommand deleteActivityCommand) {
        String activityId = deleteActivityCommand.id();

        ActivityListing currentActivityListing;
        try { currentActivityListing = activityRepository.getById(activityId).orElseThrow(); }
        catch (Exception e) { e.printStackTrace(); return; }
        ActivityEntity currentActivity = MapperActivityActivityEntity.activityListingToActivityEntity(currentActivityListing);

        String currentImageKey = currentActivity.getImageKey();
        if (currentImageKey != null && !currentImageKey.isEmpty()) {
            try {
                Path logoPath = Paths.get("/srv/cv-api/images/activities", currentImageKey);
                Files.deleteIfExists(logoPath);
            } catch (Exception e) { e.printStackTrace(); }
        }
    }
}
