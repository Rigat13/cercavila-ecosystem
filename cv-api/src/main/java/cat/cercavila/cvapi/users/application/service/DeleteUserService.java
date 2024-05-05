package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.delete.DeleteUserCommand;
import cat.cercavila.cvapi.users.application.port.in.delete.DeleteUserUseCase;
import cat.cercavila.cvapi.users.application.port.out.DeleteUserPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteUserService implements DeleteUserUseCase {
    private final DeleteUserPort deleteUserPort;

    public DeleteUserService(DeleteUserPort deleteUserPort) {
        this.deleteUserPort = deleteUserPort;
    }

    @Override
    public void deleteUser(DeleteUserCommand deleteUserCommand) {
        // TODO perform checks
        deleteUserPort.deleteUser(deleteUserCommand);
    }
}
