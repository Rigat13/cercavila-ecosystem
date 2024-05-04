package cat.cercavila.cvapi.users.application.port.out;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;

public interface StoreUserPort {
    public void storeColla(CreateUserCommand createUserCommand);
}
