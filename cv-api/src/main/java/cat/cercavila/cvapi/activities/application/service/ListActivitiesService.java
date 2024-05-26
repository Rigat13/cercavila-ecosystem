package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.in.list.ListActivities;
import cat.cercavila.cvapi.activities.application.port.out.ListActivityPort;
import cat.cercavila.cvapi.activities.application.service.exception.ActivityNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListActivitiesService implements ListActivities {
    private final ListActivityPort listActivitiesPort;

    ListActivitiesService(ListActivityPort listActivitiesPort) { this.listActivitiesPort = listActivitiesPort; }

    @Override
    public ActivityListing getActivityById(String id) {
        return listActivitiesPort.loadActivityById(id)
                .orElseThrow(() -> new ActivityNotFound(id));
    }

    @Override
    public ActivityListing getActivityByQuestion(String question) {
        return listActivitiesPort.loadActivityByQuestion(question)
                .orElseThrow(() -> new ActivityNotFound(question));
    }

    @Override
    public List<ActivityListing> getAllActivitiesByQuestion() { return listActivitiesPort.loadAllActivitiesByQuestion(); }

    @Override
    public List<ActivityListing> getAllActivitiesByType() { return listActivitiesPort.loadAllActivitiesByType(); }

    @Override
    public List<ActivityListing> getAllActivities() { return listActivitiesPort.loadAllActivities(); }

    @Override
    public List<ActivityListing> getAllActivitiesNoImage() { return listActivitiesPort.loadAllActivitiesNoImage(); }
}
