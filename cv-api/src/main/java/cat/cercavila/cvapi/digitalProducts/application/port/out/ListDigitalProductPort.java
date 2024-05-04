package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;

import java.util.List;
import java.util.Optional;

public interface ListDigitalProductPort {
    Optional<DigitalProductListing> loadFiguraById(String id);
    Optional<DigitalProductListing> loadFiguraByName(String name);

    List<DigitalProductListing> loadAllFiguresByName();
    List<DigitalProductListing> loadAllFiguresByYear();
    List<DigitalProductListing> loadAllFiguresByType();
    List<DigitalProductListing> loadAllFigures();
    List<DigitalProductListing> loadAllFiguresNoImage();
}
