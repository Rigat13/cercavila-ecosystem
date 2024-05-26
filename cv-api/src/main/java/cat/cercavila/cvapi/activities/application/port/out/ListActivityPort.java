package cat.cercavila.cvapi.activities.application.port.out;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;

import java.util.List;
import java.util.Optional;

public interface ListActivityPort {
    Optional<ActivityListing> loadActivityById(String id);
    Optional<ActivityListing> loadActivityByQuestion(String name);

    List<ActivityListing> loadAllActivitiesByQuestion();
    List<ActivityListing> loadAllActivitiesByType();
    List<ActivityListing> loadAllActivities();
    List<ActivityListing> loadAllActivitiesNoImage();
}
