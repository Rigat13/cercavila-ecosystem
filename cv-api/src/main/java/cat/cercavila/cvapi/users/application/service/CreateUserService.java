package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.create.CreateUserUseCase;
import cat.cercavila.cvapi.users.application.port.out.StoreUserPort;
import org.springframework.stereotype.Service;

@Service
public class CreateUserService implements CreateUserUseCase {
    private final StoreUserPort storeUserPort;

    public CreateUserService(StoreUserPort storeUserPort) {
        this.storeUserPort = storeUserPort;
    }

    @Override
    public void createColla(CreateUserCommand createUserCommand) {
        // TODO perform checks
        storeUserPort.storeColla(createUserCommand);
    }

}
