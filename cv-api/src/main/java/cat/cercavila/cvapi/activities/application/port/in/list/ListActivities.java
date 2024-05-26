package cat.cercavila.cvapi.activities.application.port.in.list;

import java.util.List;

public interface ListActivities {
    ActivityListing getActivityById(String id);
    ActivityListing getActivityByQuestion(String name);
    List<ActivityListing> getAllActivitiesByQuestion();
    List<ActivityListing> getAllActivitiesByType();
    List<ActivityListing> getAllActivities();
    List<ActivityListing> getAllActivitiesNoImage();
}
