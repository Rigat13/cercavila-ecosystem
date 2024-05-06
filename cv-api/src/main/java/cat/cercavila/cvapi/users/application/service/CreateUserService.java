package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.create.CreateUserUseCase;
import cat.cercavila.cvapi.users.application.port.out.StoreUserPort;
import cat.cercavila.cvapi.users.application.service.exception.UserNicknameAlreadyExists;
import org.springframework.stereotype.Service;

@Service
public class CreateUserService implements CreateUserUseCase {
    private final StoreUserPort storeUserPort;

    public CreateUserService(StoreUserPort storeUserPort) {
        this.storeUserPort = storeUserPort;
    }

    @Override
    public void createUser(CreateUserCommand createUserCommand) throws UserNicknameAlreadyExists {
        // TODO perform checks
        storeUserPort.storeUser(createUserCommand);
    }

}
