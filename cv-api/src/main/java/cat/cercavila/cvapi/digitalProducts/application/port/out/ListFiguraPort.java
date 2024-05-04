package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;

import java.util.List;
import java.util.Optional;

public interface ListFiguraPort {
    Optional<FiguraListing> loadFiguraById(String id);
    Optional<FiguraListing> loadFiguraByName(String name);

    List<FiguraListing> loadAllFiguresByName();
    List<FiguraListing> loadAllFiguresByYear();
    List<FiguraListing> loadAllFiguresByType();
    List<FiguraListing> loadAllFigures();
    List<FiguraListing> loadAllFiguresNoImage();
}
