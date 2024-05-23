package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.create.CreateUserUseCase;
import cat.cercavila.cvapi.users.application.port.out.StoreUserPort;
import cat.cercavila.cvapi.users.application.service.exception.UserNicknameAlreadyExists;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CreateUserService implements CreateUserUseCase {
    private final StoreUserPort storeUserPort;
    private final PasswordEncoder passwordEncoder;

    public CreateUserService(StoreUserPort storeUserPort, PasswordEncoder passwordEncoder) {
        this.storeUserPort = storeUserPort;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void createUser(CreateUserCommand createUserCommand) throws UserNicknameAlreadyExists {
        String hashedPassword = passwordEncoder.encode(createUserCommand.password());
        createUserCommand = new CreateUserCommand(
                createUserCommand.id(),
                createUserCommand.nickname(),
                createUserCommand.name(),
                createUserCommand.firstSurname(),
                createUserCommand.secondSurname(),
                createUserCommand.email(),
                hashedPassword,  // Set the hashed password
                createUserCommand.roles(),
                createUserCommand.coins(),
                createUserCommand.digitalProducts(),
                createUserCommand.activeUserImage(),
                createUserCommand.activeUserImageFrame(),
                createUserCommand.activeUserBackgroundImage(),
                createUserCommand.activeUserTitle(),
                createUserCommand.activeUserBackgroundColour(),
                createUserCommand.activePins()
        );
        storeUserPort.storeUser(createUserCommand);
    }

}
