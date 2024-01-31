package cat.cercavila.cvapi.colles.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.in.list.ListColles;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.colles.application.port.in.list.ListColles"})
@RestController
public class ListCollesController {
    private final ListColles listColles;


    public ListCollesController(ListColles listColles) { this.listColles = listColles; }

    @GetMapping("/colles/id/{id}")
    public CollaListing getCollaById(@PathVariable String id) { return listColles.getCollaById(id); }

    @GetMapping("/colles/name/{name}")
    public CollaListing getCollaByName(@PathVariable String name) { return listColles.getCollaByName(name); }

    @GetMapping("/colles/name")
    public List<CollaListing> getAllCollesByName() { return listColles.getAllCollesByName(); }

    @GetMapping("/colles/foundationYear")
    public List<CollaListing> getAllCollesByFoundationYear() { return listColles.getAllCollesByFoundationYear(); }

    @GetMapping("/colles")
    public List<CollaListing> getAllColles() { return listColles.getAllColles(); }
}
