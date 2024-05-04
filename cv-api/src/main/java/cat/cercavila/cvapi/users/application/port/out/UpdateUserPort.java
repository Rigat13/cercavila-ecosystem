package cat.cercavila.cvapi.users.application.port.out;

import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;

public interface UpdateUserPort {
    public void updateColla(UpdateUserCommand updateUserCommand);
}
