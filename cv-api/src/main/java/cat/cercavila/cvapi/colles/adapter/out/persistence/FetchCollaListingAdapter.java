package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.out.ListCollaPort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class FetchCollaListingAdapter implements ListCollaPort {
    CollaRepository collaRepository;
    public FetchCollaListingAdapter(CollaRepository collaRepository) {
        this.collaRepository = collaRepository;
    }

    @Override
    public Optional<CollaListing> loadCollaById(String id) { return this.collaRepository.getById(id); }

    @Override
    public Optional<CollaListing> loadCollaByName(String name) { return this.collaRepository.getByName(name);}

    @Override
    public List<CollaListing> loadAllCollesByName() { return this.collaRepository.loadAllCollesByName(); }

    @Override
    public List<CollaListing> loadAllCollesByFoundationYear() { return this.collaRepository.loadAllCollesByFoundationYear(); }

    @Override
    public List<CollaListing> loadAllColles() { return this.collaRepository.findAllListing(); }
}
