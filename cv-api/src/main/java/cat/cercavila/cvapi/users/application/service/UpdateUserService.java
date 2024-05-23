package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserUseCase;
import cat.cercavila.cvapi.users.application.port.out.UpdateUserPort;
import cat.cercavila.cvapi.users.application.service.exception.UserNicknameAlreadyExists;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserService implements UpdateUserUseCase {
    private final UpdateUserPort updateCollaPort;
    private final PasswordEncoder passwordEncoder;

    public UpdateUserService(UpdateUserPort updateCollaPort, PasswordEncoder passwordEncoder) {
        this.updateCollaPort = updateCollaPort;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void updateUser(UpdateUserCommand updateUserCommand) throws UserNicknameAlreadyExists {
        String hashedPassword = passwordEncoder.encode(updateUserCommand.password());
        updateUserCommand = new UpdateUserCommand(
                updateUserCommand.id(),
                updateUserCommand.nickname(),
                updateUserCommand.name(),
                updateUserCommand.firstSurname(),
                updateUserCommand.secondSurname(),
                updateUserCommand.email(),
                hashedPassword,  // Set the hashed password
                updateUserCommand.roles(),
                updateUserCommand.coins(),
                updateUserCommand.digitalProducts(),
                updateUserCommand.activeUserImage(),
                updateUserCommand.activeUserImageFrame(),
                updateUserCommand.activeUserBackgroundImage(),
                updateUserCommand.activeUserTitle(),
                updateUserCommand.activeUserBackgroundColour(),
                updateUserCommand.activePins()
        );
        updateCollaPort.updateUser(updateUserCommand);
    }
}
