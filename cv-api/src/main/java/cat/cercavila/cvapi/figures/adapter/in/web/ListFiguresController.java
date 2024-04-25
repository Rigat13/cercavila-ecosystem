package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.figures.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.figures.application.port.in.list.ListFigures;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.figures.application.port.in.list.ListFigures"})
@RestController
public class ListFiguresController {
    private final ListFigures listFigures;


    public ListFiguresController(ListFigures listFigures) { this.listFigures = listFigures; }

    @GetMapping("/api/figures/id/{id}")
    public FiguraListing getFiguraById(@PathVariable String id) { return listFigures.getFiguraById(id); }

    @GetMapping("/api/figures/name/{name}")
    public FiguraListing getFiguraByName(@PathVariable String name) { return listFigures.getFiguraByName(name); }

    @GetMapping("/api/figures/name")
    public List<FiguraListing> getAllFiguresByName() { return listFigures.getAllFiguresByName(); }

    @GetMapping("/api/figures/year")
    public List<FiguraListing> getAllFiguresByYear() { return listFigures.getAllFiguresByYear(); }

    @GetMapping("/api/figures/type")
    public List<FiguraListing> getAllFiguresByType() { return listFigures.getAllFiguresByType(); }

    @GetMapping("/api/figures")
    public List<FiguraListing> getAllFigures() { return listFigures.getAllFigures(); }

    @GetMapping("/api/figures/noimage")
    public List<FiguraListing> getAllFiguresNoImage() { return listFigures.getAllFiguresNoImage(); }
}
