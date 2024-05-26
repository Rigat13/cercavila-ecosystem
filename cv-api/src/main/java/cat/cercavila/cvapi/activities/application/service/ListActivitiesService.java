package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.application.port.in.list.ListActivities;
import cat.cercavila.cvapi.activities.application.port.out.ListActivityPort;
import cat.cercavila.cvapi.activities.application.service.exception.ActivityNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListActivitiesService implements ListActivities {
    private final ListActivityPort listFiguresPort;

    ListActivitiesService(ListActivityPort listFiguresPort) { this.listFiguresPort = listFiguresPort; }

    @Override
    public ActivityListing getFiguraById(String id) {
        return listFiguresPort.loadFiguraById(id)
                .orElseThrow(() -> new ActivityNotFound(id));
    }

    @Override
    public ActivityListing getFiguraByName(String name) {
        return listFiguresPort.loadFiguraByName(name)
                .orElseThrow(() -> new ActivityNotFound(name));
    }

    @Override
    public List<ActivityListing> getAllFiguresByName() { return listFiguresPort.loadAllFiguresByName(); }

    @Override
    public List<ActivityListing> getAllFiguresByYear() { return listFiguresPort.loadAllFiguresByYear(); }

    @Override
    public List<ActivityListing> getAllFiguresByType() { return listFiguresPort.loadAllFiguresByType(); }

    @Override
    public List<ActivityListing> getAllFigures() { return listFiguresPort.loadAllFigures(); }

    @Override
    public List<ActivityListing> getAllFiguresNoImage() { return listFiguresPort.loadAllFiguresNoImage(); }
}
