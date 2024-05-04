package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.digitalProducts.application.port.in.list.ListFigures;
import cat.cercavila.cvapi.digitalProducts.application.port.out.ListFiguraPort;
import cat.cercavila.cvapi.digitalProducts.application.service.exception.FiguraNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListFiguresService implements ListFigures {
    private final ListFiguraPort listFiguresPort;

    ListFiguresService(ListFiguraPort listFiguresPort) { this.listFiguresPort = listFiguresPort; }

    @Override
    public FiguraListing getFiguraById(String id) {
        return listFiguresPort.loadFiguraById(id)
                .orElseThrow(() -> new FiguraNotFound(id));
    }

    @Override
    public FiguraListing getFiguraByName(String name) {
        return listFiguresPort.loadFiguraByName(name)
                .orElseThrow(() -> new FiguraNotFound(name));
    }

    @Override
    public List<FiguraListing> getAllFiguresByName() { return listFiguresPort.loadAllFiguresByName(); }

    @Override
    public List<FiguraListing> getAllFiguresByYear() { return listFiguresPort.loadAllFiguresByYear(); }

    @Override
    public List<FiguraListing> getAllFiguresByType() { return listFiguresPort.loadAllFiguresByType(); }

    @Override
    public List<FiguraListing> getAllFigures() { return listFiguresPort.loadAllFigures(); }

    @Override
    public List<FiguraListing> getAllFiguresNoImage() { return listFiguresPort.loadAllFiguresNoImage(); }
}
