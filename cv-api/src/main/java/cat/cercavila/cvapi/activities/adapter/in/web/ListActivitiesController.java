package cat.cercavila.cvapi.activities.adapter.in.web;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.in.list.ListActivities;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.figures.application.port.in.list.ListActivities"})
@RestController
public class ListActivitiesController {
    private final ListActivities listActivities;


    public ListActivitiesController(ListActivities listActivities) { this.listActivities = listActivities; }

    @GetMapping("/api/figures/id/{id}")
    public ActivityListing getFiguraById(@PathVariable String id) { return listActivities.getFiguraById(id); }

    @GetMapping("/api/figures/name/{name}")
    public ActivityListing getFiguraByName(@PathVariable String name) { return listActivities.getFiguraByName(name); }

    @GetMapping("/api/figures/name")
    public List<ActivityListing> getAllFiguresByName() { return listActivities.getAllFiguresByName(); }

    @GetMapping("/api/figures/year")
    public List<ActivityListing> getAllFiguresByYear() { return listActivities.getAllFiguresByYear(); }

    @GetMapping("/api/figures/type")
    public List<ActivityListing> getAllFiguresByType() { return listActivities.getAllFiguresByType(); }

    @GetMapping("/api/figures")
    public List<ActivityListing> getAllFigures() { return listActivities.getAllFigures(); }

    @GetMapping("/api/figures/noimage")
    public List<ActivityListing> getAllFiguresNoImage() { return listActivities.getAllFiguresNoImage(); }
}
