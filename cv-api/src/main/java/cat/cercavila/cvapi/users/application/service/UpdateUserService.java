package cat.cercavila.cvapi.users.application.service;

import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserUseCase;
import cat.cercavila.cvapi.users.application.port.out.UpdateUserPort;
import org.springframework.stereotype.Service;

@Service
public class UpdateUserService implements UpdateUserUseCase {
    private final UpdateUserPort updateCollaPort;

    public UpdateUserService(UpdateUserPort updateCollaPort) {
        this.updateCollaPort = updateCollaPort;
    }

    @Override
    public void updateColla(UpdateUserCommand updateUserCommand) {
        // TODO perform checks
        updateCollaPort.updateColla(updateUserCommand);
    }
}
