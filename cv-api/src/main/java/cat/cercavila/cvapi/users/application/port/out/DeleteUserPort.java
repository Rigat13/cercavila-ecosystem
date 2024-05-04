package cat.cercavila.cvapi.users.application.port.out;

import cat.cercavila.cvapi.users.application.port.in.delete.DeleteUserCommand;

public interface DeleteUserPort {
    public void deleteColla(DeleteUserCommand deleteUserCommand);
}
