package cat.cercavila.cvapi.colles.adapter.out.persistence;

import cat.cercavila.cvapi.colles.application.port.in.list.CollaListing;
import cat.cercavila.cvapi.colles.application.port.out.ListCollaPort;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class FetchCollaListingAdapter implements ListCollaPort {
    CollaRepository collaRepository;

    public FetchCollaListingAdapter(CollaRepository collaRepository) {
        this.collaRepository = collaRepository;
    }

    @Override
    public Optional<CollaListing> loadCollaById(String id) {
        Optional<CollaListing> collaListingOptional = collaRepository.getById(id);
        return collaListingOptional.map(this::createCollaListingFromListing);
    }

    @Override
    public Optional<CollaListing> loadCollaByName(String name) {
        Optional<CollaListing> collaListingOptional = collaRepository.getByName(name);
        return collaListingOptional.map(this::createCollaListingFromListing);
    }

    @Override
    public List<CollaListing> loadAllCollesByName() {
        List<CollaListing> collaListings = collaRepository.loadAllCollesByName();
        return collaListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<CollaListing> loadAllCollesByFoundationYear() {
        List<CollaListing> collaListings = collaRepository.loadAllCollesByFoundationYear();
        return collaListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<CollaListing> loadAllColles() {
        List<CollaListing> collaListings = collaRepository.findAllListing();
        return collaListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    private CollaListing createCollaListingFromListing(CollaListing collaListing) {
        // Fetch the image file using the logoKey
        System.out.println("Colla name-----"+collaListing.name());
        System.out.println("COLLA LISTING-----"+collaListing);
        byte[] imageBytes = (collaListing.logoKey() == null) ? null : fetchImageFromServer(collaListing.logoKey());

        // Create a CollaListing object with database fields and image data
        return new CollaListing(
                collaListing.id(),
                collaListing.name(),
                collaListing.entity(),
                collaListing.foundationYear(),
                collaListing.description(),
                collaListing.type(),
                collaListing.neighbourhood(),
                collaListing.logoKey(),
                imageBytes
        );
    }

    private byte[] fetchImageFromServer(String logoKeyName) {
        try {
            System.out.println("LOGO KEY NAME-----"+logoKeyName);
            Path filePath = Paths.get("/srv/cv-api/images", logoKeyName);
            System.out.println("PATH-----"+filePath);
            return Files.readAllBytes(filePath);
        } catch (IOException e) { e.printStackTrace(); return null; }
    }
}


