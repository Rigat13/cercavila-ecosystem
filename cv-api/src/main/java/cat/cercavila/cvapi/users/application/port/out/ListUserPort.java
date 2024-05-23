package cat.cercavila.cvapi.users.application.port.out;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;

import java.util.List;
import java.util.Optional;

public interface ListUserPort {
    Optional<UserListing> loadUserById(String id);
    Optional<UserListing> loadUserByNickname(String name);

    List<UserListing> loadAllUsersByNickname();
    List<UserListing> loadAllUsers();
    List<String> loadAllUserNicknames();
}
