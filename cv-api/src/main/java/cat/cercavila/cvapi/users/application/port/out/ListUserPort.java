package cat.cercavila.cvapi.users.application.port.out;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;

import java.util.List;
import java.util.Optional;

public interface ListUserPort {
    Optional<UserListing> loadCollaById(String id);
    Optional<UserListing> loadCollaByName(String name);

    List<UserListing> loadAllCollesByName();
    List<UserListing> loadAllCollesByFoundationYear();
    List<UserListing> loadAllColles();
}
