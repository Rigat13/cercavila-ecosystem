package cat.cercavila.cvapi.colles.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;

import java.util.List;
import java.util.Optional;

public interface ListCollaPort {
    Optional<CollaListing> loadCollaById(String id);
    Optional<CollaListing> loadCollaByName(String name);

    List<CollaListing> loadAllCollesByName();
    List<CollaListing> loadAllCollesByFoundationYear();
    List<CollaListing> loadAllColles();
}
