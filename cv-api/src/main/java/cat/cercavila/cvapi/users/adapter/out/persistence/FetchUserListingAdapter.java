package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.application.port.out.ListUserPort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class FetchUserListingAdapter implements ListUserPort {
    UserRepository userRepository;

    public FetchUserListingAdapter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public Optional<UserListing> loadUserById(String id) {
        Optional<UserListing> userListingOptional = userRepository.getById(id);
        return userListingOptional.map(this::createUserListingFromListing);
    }

    @Override
    public Optional<UserListing> loadUserByNickname(String name) {
        Optional<UserListing> userListingOptional = userRepository.getByNickname(name);
        return userListingOptional.map(this::createUserListingFromListing);
    }

    @Override
    public List<UserListing> loadAllUsersByNickname() {
        List<UserListing> userListings = userRepository.loadAllUsersByNickname();
        return userListings.stream()
                .map(this::createUserListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserListing> loadAllUsers() {
        List<UserListing> userListings = userRepository.findAllListing();
        return userListings.stream()
                .map(this::createUserListingFromListing)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> loadAllUserNicknames() {
        return userRepository.loadAllUserNicknames();
    }

    private UserListing createUserListingFromListing(UserListing userListing) {
        // Create a UserListing object with database fields and image data
        return new UserListing(
                userListing.id(),
                userListing.nickname(),
                userListing.name(),
                userListing.firstSurname(),
                userListing.secondSurname(),
                userListing.email(),
                userListing.password(),
                userListing.roles(),
                userListing.coins(),
                userListing.digitalProducts(),
                userListing.activeUserImage(),
                userListing.activeUserImageFrame(),
                userListing.activeUserBackgroundImage(),
                userListing.activeUserTitle(),
                userListing.activeUserBackgroundColour(),
                userListing.activePins()
        );
    }
}