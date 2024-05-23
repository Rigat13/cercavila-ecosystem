package cat.cercavila.cvapi.users.application.port.in.list;

import java.util.List;

public interface ListUsers {
    UserListing getUserById(String id);
    UserListing getUserByNickname(String name);
    List<UserListing> getAllUsersByNickname();
    List<UserListing> getAllUsers();
    List<String> getAllUserNicknames();
}
