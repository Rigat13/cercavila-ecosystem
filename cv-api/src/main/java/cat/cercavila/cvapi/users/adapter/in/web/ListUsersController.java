package cat.cercavila.cvapi.users.adapter.in.web;

import cat.cercavila.cvapi.users.application.port.in.list.ListUsers;
import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.colles.application.port.in.list.ListUsers"})
@RestController
public class ListUsersController {
    private final ListUsers listUsers;


    public ListUsersController(ListUsers listUsers) { this.listUsers = listUsers; }

    @GetMapping("/api/users/id/{id}")
    public UserListing getUserById(@PathVariable String id) { return listUsers.getUserById(id); }

    @GetMapping("/api/users/name/{name}")
    public UserListing getUserByNickname(@PathVariable String name) { return listUsers.getUserByNickname(name); }

    @GetMapping("/api/users/name")
    public List<UserListing> getAllUsersByNickname() { return listUsers.getAllUsersByNickname(); }

    @GetMapping("/api/users")
    public List<UserListing> getAllUsers() { return listUsers.getAllUsers(); }

    @GetMapping("/api/users/nicknames")
    public List<String> getAllUserNicknames() { return listUsers.getAllUserNicknames(); }
}
