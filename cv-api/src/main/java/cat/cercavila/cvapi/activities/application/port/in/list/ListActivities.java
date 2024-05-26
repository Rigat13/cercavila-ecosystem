package cat.cercavila.cvapi.activities.application.port.in.list;

import java.util.List;

public interface ListActivities {
    ActivityListing getFiguraById(String id);
    ActivityListing getFiguraByName(String name);
    List<ActivityListing> getAllFiguresByName();
    List<ActivityListing> getAllFiguresByYear();
    List<ActivityListing> getAllFiguresByType();
    List<ActivityListing> getAllFigures();
    List<ActivityListing> getAllFiguresNoImage();
}
