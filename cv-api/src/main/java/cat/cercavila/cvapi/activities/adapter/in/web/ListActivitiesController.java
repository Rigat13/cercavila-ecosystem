package cat.cercavila.cvapi.activities.adapter.in.web;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.in.list.ListActivities;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.activities.application.port.in.list.ListActivities"})
@RestController
public class ListActivitiesController {
    private final ListActivities listActivities;


    public ListActivitiesController(ListActivities listActivities) { this.listActivities = listActivities; }

    @GetMapping("/api/activities/id/{id}")
    public ActivityListing getActivityById(@PathVariable String id) { return listActivities.getActivityById(id); }

    @GetMapping("/api/activities/question/{question}")
    public ActivityListing getActivityByQuestion(@PathVariable String question) { return listActivities.getActivityByQuestion(question); }

    @GetMapping("/api/activities/question")
    public List<ActivityListing> getAllActivitiesByQuestion() { return listActivities.getAllActivitiesByQuestion(); }

    @GetMapping("/api/activities/type")
    public List<ActivityListing> getAllActivitiesByType() { return listActivities.getAllActivitiesByType(); }

    @GetMapping("/api/activities")
    public List<ActivityListing> getAllActivities() { return listActivities.getAllActivities(); }

    @GetMapping("/api/activities/noimage")
    public List<ActivityListing> getAllActivitiesNoImage() { return listActivities.getAllActivitiesNoImage(); }
}
