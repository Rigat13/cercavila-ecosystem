package cat.cercavila.cvapi.figures.application.service;

import cat.cercavila.cvapi.figures.application.port.in.update.UpdateFiguraCommand;
import cat.cercavila.cvapi.figures.application.port.in.update.UpdateFiguraUseCase;
import cat.cercavila.cvapi.figures.application.port.out.UpdateFiguraPort;
import org.springframework.stereotype.Service;

@Service
public class UpdateFiguraService implements UpdateFiguraUseCase {
    private final UpdateFiguraPort updateFiguraPort;

    public UpdateFiguraService(UpdateFiguraPort updateFiguraPort) {
        this.updateFiguraPort = updateFiguraPort;
    }

    @Override
    public void updateFigura(UpdateFiguraCommand updateFiguraCommand) {
        // TODO perform checks
        updateFiguraPort.updateFigura(updateFiguraCommand);
    }
}
