package cat.cercavila.cvapi.users.adapter.out.persistence;


import cat.cercavila.cvapi.users.application.port.in.list.UserListing;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;
import cat.cercavila.cvapi.users.application.port.out.UpdateUserPort;
import cat.cercavila.cvapi.users.application.service.exception.UserNicknameAlreadyExists;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class UpdateUserAdapter implements UpdateUserPort {
    private final UserRepository userRepository;

    public UpdateUserAdapter(UserRepository userRepository) { this.userRepository = userRepository; }

    @Override
    public void updateUser(UpdateUserCommand updateUserCommand) throws UserNicknameAlreadyExists{
        if (userRepository.existsByNickname(updateUserCommand.nickname())) { throw new UserNicknameAlreadyExists(updateUserCommand.nickname()); }
        try { userRepository.save(updateUserCommand2UserEntity(updateUserCommand)); // NOTE: save does not mean "create"; if it exists, it will update
        } catch (DataIntegrityViolationException e) { throw new UserNicknameAlreadyExists(updateUserCommand.nickname()); }
    }

    private UserEntity updateUserCommand2UserEntity(UpdateUserCommand updateUserCommand) {
        UserEntity userEntity = new UserEntity();
        userEntity.setId(updateUserCommand.id());
        userEntity.setNickname(updateUserCommand.nickname());
        userEntity.setName(updateUserCommand.name());
        userEntity.setFirstSurname(updateUserCommand.firstSurname());
        userEntity.setSecondSurname(updateUserCommand.secondSurname());
        userEntity.setEmail(updateUserCommand.email());
        userEntity.setPassword(updateUserCommand.password());
        userEntity.setRoles(updateUserCommand.roles());
        userEntity.setCoins(updateUserCommand.coins());
        userEntity.setDigitalProducts(updateUserCommand.digitalProducts());
        userEntity.setActiveUserImage(updateUserCommand.activeUserImage());
        userEntity.setActiveUserImageFrame(updateUserCommand.activeUserImageFrame());
        userEntity.setActiveUserBackgroundImage(updateUserCommand.activeUserBackgroundImage());
        userEntity.setActiveUserTitle(updateUserCommand.activeUserTitle());
        userEntity.setActiveUserBackgroundColour(updateUserCommand.activeUserBackgroundColour());
        userEntity.setActivePins(updateUserCommand.activePins());

        return userEntity;
    }
}
