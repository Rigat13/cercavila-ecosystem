package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.application.port.out.ListUserPort;
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
public class FetchUserListingAdapter implements ListUserPort {
    UserRepository userRepository;

    public FetchUserListingAdapter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<UserListing> loadCollaById(String id) {
        Optional<UserListing> collaListingOptional = userRepository.getById(id);
        return collaListingOptional.map(this::createCollaListingFromListing);
    }

    @Override
    public Optional<UserListing> loadCollaByName(String name) {
        Optional<UserListing> collaListingOptional = userRepository.getByName(name);
        return collaListingOptional.map(this::createCollaListingFromListing);
    }

    @Override
    public List<UserListing> loadAllCollesByName() {
        List<UserListing> userListings = userRepository.loadAllCollesByName();
        return userListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserListing> loadAllCollesByFoundationYear() {
        List<UserListing> userListings = userRepository.loadAllCollesByFoundationYear();
        return userListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserListing> loadAllColles() {
        List<UserListing> userListings = userRepository.findAllListing();
        return userListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    private UserListing createCollaListingFromListing(UserListing userListing) {
        // Fetch the image file using the logoKey
        byte[] imageBytes = (userListing.logoKey() == null) ? null : fetchImageFromServer(userListing.logoKey());

        // Create a UserListing object with database fields and image data
        return new UserListing(
                userListing.id(),
                userListing.name(),
                userListing.entity(),
                userListing.foundationYear(),
                userListing.description(),
                userListing.type(),
                userListing.neighbourhood(),
                userListing.primaryColour(),
                userListing.secondaryColour(),
                userListing.logoKey(),
                imageBytes,
                userListing.music(),
                userListing.email(),
                userListing.instagram(),
                userListing.figures()
        );
    }

    private byte[] fetchImageFromServer(String logoKeyName) {
        try {
            Path directoryPath = Paths.get("/srv/cv-api/images");
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


