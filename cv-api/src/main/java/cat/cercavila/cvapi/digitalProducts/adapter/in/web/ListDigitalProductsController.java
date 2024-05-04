package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.list.ListDigitalProducts;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@ComponentScan({"cat.cercavila.cvapi.digitalProducts.application.port.in.list.ListDigitalProducts"})
@RestController
public class ListDigitalProductsController {
    private final ListDigitalProducts listDigitalProducts;


    public ListDigitalProductsController(ListDigitalProducts listDigitalProducts) { this.listDigitalProducts = listDigitalProducts; }

    @GetMapping("/api/digitalproducts/id/{id}")
    public DigitalProductListing getDigitalProductById(@PathVariable String id) { return listDigitalProducts.getDigitalProductById(id); }

    @GetMapping("/api/digitalproducts/name/{name}")
    public DigitalProductListing getDigitalProductByName(@PathVariable String name) { return listDigitalProducts.getDigitalProductByName(name); }

    @GetMapping("/api/digitalproducts/name")
    public List<DigitalProductListing> getAllDigitalProductsByName() { return listDigitalProducts.getAllDigitalProductsByName(); }

    @GetMapping("/api/digitalproducts/year")
    public List<DigitalProductListing> getAllDigitalProductsByPrice() { return listDigitalProducts.getAllDigitalProductsByPrice(); }

    @GetMapping("/api/digitalproducts/type")
    public List<DigitalProductListing> getAllDigitalProductsByType() { return listDigitalProducts.getAllDigitalProductsByType(); }

    @GetMapping("/api/digitalproducts")
    public List<DigitalProductListing> getAllDigitalProducts() { return listDigitalProducts.getAllDigitalProducts(); }

    @GetMapping("/api/digitalproducts/noimage")
    public List<DigitalProductListing> getAllDigitalProductsNoImage() { return listDigitalProducts.getAllDigitalProductsNoImage(); }
}
