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
    public Optional<UserListing> loadUserById(String id) {
        Optional<UserListing> collaListingOptional = userRepository.getById(id);
        return collaListingOptional.map(this::createCollaListingFromListing);
    }

    @Override
    public Optional<UserListing> loadUserByName(String name) {
        Optional<UserListing> collaListingOptional = userRepository.getByName(name);
        return collaListingOptional.map(this::createCollaListingFromListing);
    }

    @Override
    public List<UserListing> loadAllUsersByName() {
        List<UserListing> userListings = userRepository.loadAllCollesByName();
        return userListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserListing> loadAllUsers() {
        List<UserListing> userListings = userRepository.findAllListing();
        return userListings.stream()
                .map(this::createCollaListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> loadAllUserNicknames() {
        return userRepository.loadAllUserNicknames();
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
}


