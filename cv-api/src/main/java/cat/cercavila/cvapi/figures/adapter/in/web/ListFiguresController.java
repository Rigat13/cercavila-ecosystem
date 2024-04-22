package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.in.list.ListColles;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.colles.application.port.in.list.ListFigura"})
@RestController
public class ListFiguresController {
    private final ListColles listColles;


    public ListFiguresController(ListColles listColles) { this.listColles = listColles; }

    @GetMapping("/api/colles/id/{id}")
    public CollaListing getCollaById(@PathVariable String id) { return listColles.getCollaById(id); }

    @GetMapping("/api/colles/name/{name}")
    public CollaListing getCollaByName(@PathVariable String name) { return listColles.getCollaByName(name); }

    @GetMapping("/api/colles/name")
    public List<CollaListing> getAllCollesByName() { return listColles.getAllCollesByName(); }

    @GetMapping("/api/colles/foundationYear")
    public List<CollaListing> getAllCollesByFoundationYear() { return listColles.getAllCollesByFoundationYear(); }

    @GetMapping("/api/colles")
    public List<CollaListing> getAllColles() { return listColles.getAllColles(); }
}
