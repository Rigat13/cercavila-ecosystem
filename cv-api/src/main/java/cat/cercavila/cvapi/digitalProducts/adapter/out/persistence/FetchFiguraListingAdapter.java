package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.FiguraListing;
import cat.cercavila.cvapi.digitalProducts.application.port.out.ListFiguraPort;
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
public class FetchFiguraListingAdapter implements ListFiguraPort {
    FiguraRepository figuraRepository;

    public FetchFiguraListingAdapter(FiguraRepository figuraRepository) {
        this.figuraRepository = figuraRepository;
    }

    @Override
    public Optional<FiguraListing> loadFiguraById(String id) {
        Optional<FiguraListing> figuraListingOptional = figuraRepository.getById(id);
        return figuraListingOptional.map(this::createFiguraListingFromListing);
    }

    @Override
    public Optional<FiguraListing> loadFiguraByName(String name) {
        Optional<FiguraListing> figuraListingOptional = figuraRepository.getByName(name);
        return figuraListingOptional.map(this::createFiguraListingFromListing);
    }

    @Override
    public List<FiguraListing> loadAllFiguresByName() {
        List<FiguraListing> figuraListings = figuraRepository.loadAllFiguresByName();
        return figuraListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<FiguraListing> loadAllFiguresByYear() {
        List<FiguraListing> figuraListings = figuraRepository.loadAllFiguresByYear();
        return figuraListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<FiguraListing> loadAllFiguresByType() {
        List<FiguraListing> figuraListings = figuraRepository.loadAllFiguresByType();
        return figuraListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<FiguraListing> loadAllFigures() {
        List<FiguraListing> figuraListings = figuraRepository.findAllListing();
        return figuraListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<FiguraListing> loadAllFiguresNoImage() {
        List<FiguraListing> figuraListings = figuraRepository.findAllListing();
        return figuraListings;
    }

    private FiguraListing createFiguraListingFromListing(FiguraListing figuraListing) {
        // Fetch the image file using the imageKey
        byte[] imageBytes = (figuraListing.imageKey() == null) ? null : fetchImageFromServer(figuraListing.imageKey());

        // Create a FiguraListing object with database fields and image data
        return new FiguraListing(
                figuraListing.id(),
                figuraListing.name(),
                figuraListing.year(),
                figuraListing.type(),
                figuraListing.imageKey(),
                imageBytes,
                figuraListing.webUrl()
        );
    }

    private byte[] fetchImageFromServer(String imageKeyName) {
        try {
            Path directoryPath = Paths.get("/srv/cv-api/images/figures");
            if (Files.isDirectory(directoryPath)) {
                try (Stream<Path> paths = Files.list(directoryPath)) {
                    Optional<Path> imagePathOptional = paths.filter(path -> path.getFileName().toString().equals(imageKeyName)).findFirst();
                    if (imagePathOptional.isPresent()) {
                        Path imagePath = imagePathOptional.get();
                        System.out.println("IMAGE FILE PATH: " + imagePath);
                        return Files.readAllBytes(imagePath);
                    } else { System.out.println("Image file not found: " + imageKeyName); return null; }
                }
            } else { System.out.println("Directory not found: " + directoryPath); return null; }
        } catch (IOException e) { System.err.println("Error reading image file: " + e.getMessage()); e.printStackTrace(); return null; }
    }
}


