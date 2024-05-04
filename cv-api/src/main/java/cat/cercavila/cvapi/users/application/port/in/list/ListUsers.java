package cat.cercavila.cvapi.users.application.port.in.list;

import java.util.List;

public interface ListUsers {
    UserListing getCollaById(String id);
    UserListing getCollaByName(String name);
    List<UserListing> getAllCollesByName();
    List<UserListing> getAllCollesByFoundationYear();
    List<UserListing> getAllColles();
}
