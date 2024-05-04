package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.list.ListDigitalProducts;
import cat.cercavila.cvapi.digitalProducts.application.port.out.ListDigitalProductPort;
import cat.cercavila.cvapi.digitalProducts.application.service.exception.DigitalProductNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListDigitalProductsService implements ListDigitalProducts {
    private final ListDigitalProductPort listFiguresPort;

    ListDigitalProductsService(ListDigitalProductPort listFiguresPort) { this.listFiguresPort = listFiguresPort; }

    @Override
    public DigitalProductListing getFiguraById(String id) {
        return listFiguresPort.loadFiguraById(id)
                .orElseThrow(() -> new DigitalProductNotFound(id));
    }

    @Override
    public DigitalProductListing getFiguraByName(String name) {
        return listFiguresPort.loadFiguraByName(name)
                .orElseThrow(() -> new DigitalProductNotFound(name));
    }

    @Override
    public List<DigitalProductListing> getAllFiguresByName() { return listFiguresPort.loadAllFiguresByName(); }

    @Override
    public List<DigitalProductListing> getAllFiguresByYear() { return listFiguresPort.loadAllFiguresByYear(); }

    @Override
    public List<DigitalProductListing> getAllFiguresByType() { return listFiguresPort.loadAllFiguresByType(); }

    @Override
    public List<DigitalProductListing> getAllFigures() { return listFiguresPort.loadAllFigures(); }

    @Override
    public List<DigitalProductListing> getAllFiguresNoImage() { return listFiguresPort.loadAllFiguresNoImage(); }
}
