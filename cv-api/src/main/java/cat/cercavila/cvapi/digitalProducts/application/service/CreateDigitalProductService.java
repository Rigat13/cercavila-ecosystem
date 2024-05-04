package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateDigitalProductUseCase;
import cat.cercavila.cvapi.digitalProducts.application.port.out.StoreDigitalProductPort;
import org.springframework.stereotype.Service;

@Service
public class CreateDigitalProductService implements CreateDigitalProductUseCase {
    private final StoreDigitalProductPort storeFiguraPort;

    public CreateDigitalProductService(StoreDigitalProductPort storeFiguraPort) {
        this.storeFiguraPort = storeFiguraPort;
    }

    @Override
    public void createFigura(CreateDigitalProductCommand createDigitalProductCommand) {
        // TODO perform checks
        storeFiguraPort.storeFigura(createDigitalProductCommand);
    }

}
