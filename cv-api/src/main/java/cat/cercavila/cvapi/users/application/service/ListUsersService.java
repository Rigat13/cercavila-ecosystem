package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.list.ListUsers;
import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.application.port.out.ListUserPort;
import cat.cercavila.cvapi.users.application.service.exception.UserNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListUsersService implements ListUsers {
    private final ListUserPort listCollesPort;

    ListUsersService(ListUserPort listCollesPort) { this.listCollesPort = listCollesPort; }

    @Override
    public UserListing getUserById(String id) {
        return listCollesPort.loadUserById(id)
                .orElseThrow(() -> new UserNotFound(id));
    }

    @Override
    public UserListing getUserByNickname(String name) {
        return listCollesPort.loadUserByNickname(name)
                .orElseThrow(() -> new UserNotFound(name));
    }

    @Override
    public List<UserListing> getAllUsersByNickname() { return listCollesPort.loadAllUsersByNickname(); }

    @Override
    public List<UserListing> getAllUsers() { return listCollesPort.loadAllUsers(); }

    @Override
    public List<String> getAllUserNicknames() { return listCollesPort.loadAllUserNicknames(); }

}
