package cat.cercavila.cvapi.digitalProducts.application.port.in.list;

import java.util.List;

public interface ListDigitalProducts {
    DigitalProductListing getFiguraById(String id);
    DigitalProductListing getFiguraByName(String name);
    List<DigitalProductListing> getAllFiguresByName();
    List<DigitalProductListing> getAllFiguresByYear();
    List<DigitalProductListing> getAllFiguresByType();
    List<DigitalProductListing> getAllFigures();
    List<DigitalProductListing> getAllFiguresNoImage();
}
