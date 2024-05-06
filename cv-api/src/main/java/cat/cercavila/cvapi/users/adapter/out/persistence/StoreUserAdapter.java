package cat.cercavila.cvapi.users.adapter.out.persistence;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.out.StoreUserPort;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class StoreUserAdapter implements StoreUserPort {
    private final UserRepository userRepository;

    public StoreUserAdapter(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    public void storeUser(CreateUserCommand createUserCommand) {
        userRepository.save(createUserCommand2UserEntity(createUserCommand));
    }

    private UserEntity createUserCommand2UserEntity(CreateUserCommand createUserCommand) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(UUID.randomUUID().toString()); // IMPORTANT: This is to create a new User without an ID
        userEntity.setNickname(createUserCommand.nickname());
        userEntity.setName(createUserCommand.name());
        userEntity.setFirstSurname(createUserCommand.firstSurname());
        userEntity.setSecondSurname(createUserCommand.secondSurname());
        userEntity.setEmail(createUserCommand.email());
        userEntity.setPassword(createUserCommand.password());
        userEntity.setRoles(createUserCommand.roles());
        userEntity.setCoins(createUserCommand.coins());
        userEntity.setDigitalProducts(createUserCommand.digitalProducts());
        userEntity.setActiveUserImage(createUserCommand.activeUserImage());
        userEntity.setActiveUserImageFrame(createUserCommand.activeUserImageFrame());
        userEntity.setActiveUserBackgroundImage(createUserCommand.activeUserBackgroundImage());
        userEntity.setActiveUserTitle(createUserCommand.activeUserTitle());
        userEntity.setActiveUserBackgroundColour(createUserCommand.activeUserBackgroundColour());
        userEntity.setActivePins(createUserCommand.activePins());

        return userEntity;
    }
}
