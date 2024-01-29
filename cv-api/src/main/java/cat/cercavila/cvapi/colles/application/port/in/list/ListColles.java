package cat.cercavila.cvapi.colles.application.port.in.list;

import java.util.List;

public interface ListColles {
    List<CollaListing> getAllColles();
    CollaListing getCollaById(String id);
    CollaListing getCollaByName(String name);
}
