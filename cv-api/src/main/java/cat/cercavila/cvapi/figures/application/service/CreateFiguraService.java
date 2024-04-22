package cat.cercavila.cvapi.figures.application.service;

import cat.cercavila.cvapi.figures.application.port.in.create.CreateFiguraUseCase;
import cat.cercavila.cvapi.figures.application.port.in.create.CreateFiguraCommand;
import cat.cercavila.cvapi.figures.application.port.out.StoreFiguraPort;
import org.springframework.stereotype.Service;

@Service
public class CreateFiguraService implements CreateFiguraUseCase {
    private final StoreFiguraPort storeFiguraPort;

    public CreateFiguraService(StoreFiguraPort storeFiguraPort) {
        this.storeFiguraPort = storeFiguraPort;
    }

    @Override
    public void createFigura(CreateFiguraCommand createFiguraCommand) {
        // TODO perform checks
        storeFiguraPort.storeFigura(createFiguraCommand);
    }

}
