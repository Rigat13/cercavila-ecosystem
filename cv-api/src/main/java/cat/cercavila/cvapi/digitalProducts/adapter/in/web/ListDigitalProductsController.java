package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.list.ListDigitalProducts;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.figures.application.port.in.list.ListDigitalProducts"})
@RestController
public class ListDigitalProductsController {
    private final ListDigitalProducts listDigitalProducts;


    public ListDigitalProductsController(ListDigitalProducts listDigitalProducts) { this.listDigitalProducts = listDigitalProducts; }

    @GetMapping("/api/figures/id/{id}")
    public DigitalProductListing getFiguraById(@PathVariable String id) { return listDigitalProducts.getFiguraById(id); }

    @GetMapping("/api/figures/name/{name}")
    public DigitalProductListing getFiguraByName(@PathVariable String name) { return listDigitalProducts.getFiguraByName(name); }

    @GetMapping("/api/figures/name")
    public List<DigitalProductListing> getAllFiguresByName() { return listDigitalProducts.getAllFiguresByName(); }

    @GetMapping("/api/figures/year")
    public List<DigitalProductListing> getAllFiguresByYear() { return listDigitalProducts.getAllFiguresByYear(); }

    @GetMapping("/api/figures/type")
    public List<DigitalProductListing> getAllFiguresByType() { return listDigitalProducts.getAllFiguresByType(); }

    @GetMapping("/api/figures")
    public List<DigitalProductListing> getAllFigures() { return listDigitalProducts.getAllFigures(); }

    @GetMapping("/api/figures/noimage")
    public List<DigitalProductListing> getAllFiguresNoImage() { return listDigitalProducts.getAllFiguresNoImage(); }
}
