package cat.cercavila.cvapi.figures.application.port.in.list;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;

import java.util.List;

public interface ListFigura {
    CollaListing getCollaById(String id);
    CollaListing getCollaByName(String name);
    List<CollaListing> getAllCollesByName();
    List<CollaListing> getAllCollesByFoundationYear();
    List<CollaListing> getAllColles();
}
