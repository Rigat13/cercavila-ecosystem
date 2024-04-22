package cat.cercavila.cvapi.figures.application.port.in.list;

import java.util.List;

public interface ListFigures {
    FiguraListing getFiguraById(String id);
    FiguraListing getFiguraByName(String name);
    List<FiguraListing> getAllFiguresByName();
    List<FiguraListing> getAllFiguresByYear();
    List<FiguraListing> getAllFiguresByType();
    List<FiguraListing> getAllFigures();
}
