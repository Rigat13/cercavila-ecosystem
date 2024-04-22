package cat.cercavila.cvapi.figures.application.service;

import cat.cercavila.cvapi.figures.application.port.in.delete.DeleteFiguraCommand;
import cat.cercavila.cvapi.figures.application.port.in.delete.DeleteFiguraUseCase;
import cat.cercavila.cvapi.figures.application.port.out.DeleteFiguraPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteFiguraService implements DeleteFiguraUseCase {
    private final DeleteFiguraPort deleteFiguraPort;

    public DeleteFiguraService(DeleteFiguraPort deleteFiguraPort) {
        this.deleteFiguraPort = deleteFiguraPort;
    }

    @Override
    public void deleteFigura(DeleteFiguraCommand deleteFiguraCommand) {
        // TODO perform checks
        deleteFiguraPort.deleteFigura(deleteFiguraCommand);
    }
}
