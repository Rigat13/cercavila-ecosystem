package cat.cercavila.cvapi.activities.application.port.out;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;

import java.util.List;
import java.util.Optional;

public interface ListActivityPort {
    Optional<ActivityListing> loadFiguraById(String id);
    Optional<ActivityListing> loadFiguraByName(String name);

    List<ActivityListing> loadAllFiguresByName();
    List<ActivityListing> loadAllFiguresByYear();
    List<ActivityListing> loadAllFiguresByType();
    List<ActivityListing> loadAllFigures();
    List<ActivityListing> loadAllFiguresNoImage();
}
