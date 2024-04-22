package cat.cercavila.cvapi.figures.application.service;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.out.UpdateCollaPort;
import org.springframework.stereotype.Service;

@Service
public class UpdateFiguraService implements UpdateCollaUseCase {
    private final UpdateCollaPort updateCollaPort;

    public UpdateFiguraService(UpdateCollaPort updateCollaPort) {
        this.updateCollaPort = updateCollaPort;
    }

    @Override
    public void updateColla(UpdateCollaCommand updateCollaCommand) {
        // TODO perform checks
        updateCollaPort.updateColla(updateCollaCommand);
    }
}
