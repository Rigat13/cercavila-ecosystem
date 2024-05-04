package cat.cercavila.cvapi.digitalProducts.adapter.out.persistence;

import cat.cercavila.cvapi.digitalProducts.application.port.in.list.DigitalProductListing;
import cat.cercavila.cvapi.digitalProducts.application.port.out.ListDigitalProductPort;
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
public class FetchDigitalProductListingAdapter implements ListDigitalProductPort {
    DigitalProductRepository digitalProductRepository;

    public FetchDigitalProductListingAdapter(DigitalProductRepository digitalProductRepository) {
        this.digitalProductRepository = digitalProductRepository;
    }

    @Override
    public Optional<DigitalProductListing> loadDigitalProductById(String id) {
        Optional<DigitalProductListing> figuraListingOptional = digitalProductRepository.getById(id);
        return figuraListingOptional.map(this::createFiguraListingFromListing);
    }

    @Override
    public Optional<DigitalProductListing> loadDigitalProductByName(String name) {
        Optional<DigitalProductListing> figuraListingOptional = digitalProductRepository.getByName(name);
        return figuraListingOptional.map(this::createFiguraListingFromListing);
    }

    @Override
    public List<DigitalProductListing> loadAllDigitalProductsByName() {
        List<DigitalProductListing> digitalProductListings = digitalProductRepository.loadAllFiguresByName();
        return digitalProductListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<DigitalProductListing> loadAllDigitalProductsByYear() {
        List<DigitalProductListing> digitalProductListings = digitalProductRepository.loadAllFiguresByYear();
        return digitalProductListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }
    
    @Override
    public List<DigitalProductListing> loadAllDigitalProductsByType() {
        List<DigitalProductListing> digitalProductListings = digitalProductRepository.loadAllFiguresByType();
        return digitalProductListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<DigitalProductListing> loadAllDigitalProducts() {
        List<DigitalProductListing> digitalProductListings = digitalProductRepository.findAllListing();
        return digitalProductListings.stream()
                .map(this::createFiguraListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<DigitalProductListing> loadAllDigitalProductsNoImage() {
        List<DigitalProductListing> digitalProductListings = digitalProductRepository.findAllListing();
        return digitalProductListings;
    }

    private DigitalProductListing createFiguraListingFromListing(DigitalProductListing digitalProductListing) {
        // Fetch the image file using the imageKey
        byte[] imageBytes = (digitalProductListing.imageKey() == null) ? null : fetchImageFromServer(digitalProductListing.imageKey());

        // Create a DigitalProductListing object with database fields and image data
        return new DigitalProductListing(
                digitalProductListing.id(),
                digitalProductListing.name(),
                digitalProductListing.year(),
                digitalProductListing.type(),
                digitalProductListing.imageKey(),
                imageBytes,
                digitalProductListing.webUrl()
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


