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
    public UserListing getCollaById(String id) {
        return listCollesPort.loadCollaById(id)
                .orElseThrow(() -> new UserNotFound(id));
    }

    @Override
    public UserListing getCollaByName(String name) {
        return listCollesPort.loadCollaByName(name)
                .orElseThrow(() -> new UserNotFound(name));
    }

    @Override
    public List<UserListing> getAllCollesByName() { return listCollesPort.loadAllCollesByName(); }

    @Override
    public List<UserListing> getAllCollesByFoundationYear() { return listCollesPort.loadAllCollesByFoundationYear(); }

    @Override
    public List<UserListing> getAllColles() { return listCollesPort.loadAllColles(); }

}
