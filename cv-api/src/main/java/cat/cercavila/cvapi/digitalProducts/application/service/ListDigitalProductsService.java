package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.list.ListDigitalProducts;
import cat.cercavila.cvapi.digitalProducts.application.port.out.ListDigitalProductPort;
import cat.cercavila.cvapi.digitalProducts.application.service.exception.DigitalProductNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListDigitalProductsService implements ListDigitalProducts {
    private final ListDigitalProductPort listDigitalProductsPort;

    ListDigitalProductsService(ListDigitalProductPort listDigitalProductsPort) { this.listDigitalProductsPort = listDigitalProductsPort; }

    @Override
    public DigitalProductListing getDigitalProductById(String id) {
        return listDigitalProductsPort.loadDigitalProductById(id)
                .orElseThrow(() -> new DigitalProductNotFound(id));
    }

    @Override
    public DigitalProductListing getDigitalProductByName(String name) {
        return listDigitalProductsPort.loadDigitalProductByName(name)
                .orElseThrow(() -> new DigitalProductNotFound(name));
    }

    @Override
    public List<DigitalProductListing> getAllDigitalProductsByName() { return listDigitalProductsPort.loadAllDigitalProductsByName(); }

    @Override
    public List<DigitalProductListing> getAllDigitalProductsByYear() { return listDigitalProductsPort.loadAllDigitalProductsByYear(); }

    @Override
    public List<DigitalProductListing> getAllDigitalProductsByType() { return listDigitalProductsPort.loadAllDigitalProductsByType(); }

    @Override
    public List<DigitalProductListing> getAllDigitalProducts() { return listDigitalProductsPort.loadAllDigitalProducts(); }

    @Override
    public List<DigitalProductListing> getAllDigitalProductsNoImage() { return listDigitalProductsPort.loadAllDigitalProductsNoImage(); }
}
