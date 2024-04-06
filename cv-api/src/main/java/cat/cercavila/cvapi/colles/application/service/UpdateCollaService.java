package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.out.UpdateCollaPort;
import org.springframework.stereotype.Service;

@Service
public class UpdateCollaService implements UpdateCollaUseCase {
    private final UpdateCollaPort updateCollaPort;

    public UpdateCollaService(UpdateCollaPort updateCollaPort) {
        this.updateCollaPort = updateCollaPort;
    }

    @Override
    public void updateColla(UpdateCollaCommand updateCollaCommand) {
        // TODO perform checks
        updateCollaPort.updateColla(updateCollaCommand);
    }
}
