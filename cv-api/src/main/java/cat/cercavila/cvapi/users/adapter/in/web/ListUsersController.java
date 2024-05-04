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

    @GetMapping("/api/colles/id/{id}")
    public UserListing getCollaById(@PathVariable String id) { return listUsers.getCollaById(id); }

    @GetMapping("/api/colles/name/{name}")
    public UserListing getCollaByName(@PathVariable String name) { return listUsers.getCollaByName(name); }

    @GetMapping("/api/colles/name")
    public List<UserListing> getAllCollesByName() { return listUsers.getAllCollesByName(); }

    @GetMapping("/api/colles/foundationYear")
    public List<UserListing> getAllCollesByFoundationYear() { return listUsers.getAllCollesByFoundationYear(); }

    @GetMapping("/api/colles")
    public List<UserListing> getAllColles() { return listUsers.getAllColles(); }
}
