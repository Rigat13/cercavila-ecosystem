package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteFiguraCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteFiguraUseCase;
import cat.cercavila.cvapi.digitalProducts.application.port.out.DeleteFiguraPort;
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
