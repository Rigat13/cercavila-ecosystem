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
import java.util.stream.Stream;

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
                collaListing.primaryColour(),
                collaListing.secondaryColour(),
                collaListing.logoKey(),
                imageBytes,
                collaListing.music(),
                collaListing.email(),
                collaListing.instagram(),
                collaListing.figures()
        );
    }

    private byte[] fetchImageFromServer(String logoKeyName) {
        try {
            Path directoryPath = Paths.get("/srv/cv-api/images/colles");
            if (Files.isDirectory(directoryPath)) {
                try (Stream<Path> paths = Files.list(directoryPath)) {
                    Optional<Path> imagePathOptional = paths.filter(path -> path.getFileName().toString().equals(logoKeyName)).findFirst();
                    if (imagePathOptional.isPresent()) {
                        Path imagePath = imagePathOptional.get();
                        System.out.println("IMAGE FILE PATH: " + imagePath);
                        return Files.readAllBytes(imagePath);
                    } else { System.out.println("Image file not found: " + logoKeyName); return null; }
                }
            } else { System.out.println("Directory not found: " + directoryPath); return null; }
        } catch (IOException e) { System.err.println("Error reading image file: " + e.getMessage()); e.printStackTrace(); return null; }
    }
}


