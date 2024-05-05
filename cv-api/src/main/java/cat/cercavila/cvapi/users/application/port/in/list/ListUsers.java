package cat.cercavila.cvapi.users.application.port.in.list;

import java.util.List;

public interface ListUsers {
    UserListing getUserById(String id);
    UserListing getUserByName(String name);
    List<UserListing> getAllUsersByName();
    List<UserListing> getAllUsers();
    List<String> getAllUserNicknames();
}
