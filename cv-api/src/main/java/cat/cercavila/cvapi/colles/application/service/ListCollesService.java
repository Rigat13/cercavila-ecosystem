package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.in.list.ListColles;
import cat.cercavila.cvapi.colles.application.port.out.ListCollaPort;
import cat.cercavila.cvapi.colles.application.service.exception.CollaNotFound;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ListCollesService implements ListColles {
    private final ListCollaPort listCollesPort;

    ListCollesService(ListCollaPort listCollesPort) { this.listCollesPort = listCollesPort; }

    @Override
    public CollaListing getCollaById(String id) {
        return listCollesPort.loadCollaById(id)
                .orElseThrow(() -> new CollaNotFound(id));
    }

    @Override
    public CollaListing getCollaByName(String name) {
        return listCollesPort.loadCollaByName(name)
                .orElseThrow(() -> new CollaNotFound(name));
    }

    @Override
    public List<CollaListing> getAllCollesByName() { return listCollesPort.loadAllCollesByName(); }

    @Override
    public List<CollaListing> getAllCollesByFoundationYear() { return listCollesPort.loadAllCollesByFoundationYear(); }

    @Override
    public List<CollaListing> getAllColles() { return listCollesPort.loadAllColles(); }

}
