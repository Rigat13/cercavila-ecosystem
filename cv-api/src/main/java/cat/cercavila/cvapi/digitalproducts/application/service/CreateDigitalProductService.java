package cat.cercavila.cvapi.digitalproducts.application.service;

import cat.cercavila.cvapi.digitalproducts.application.port.in.create.CreateDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.in.create.CreateDigitalProductUseCase;
import cat.cercavila.cvapi.digitalproducts.application.port.out.StoreDigitalProductPort;
import org.springframework.stereotype.Service;

@Service
public class CreateDigitalProductService implements CreateDigitalProductUseCase {
    private final StoreDigitalProductPort storeDigitalProductPort;

    public CreateDigitalProductService(StoreDigitalProductPort storeDigitalProductPort) {
        this.storeDigitalProductPort = storeDigitalProductPort;
    }

    @Override
    public void createDigitalProduct(CreateDigitalProductCommand createDigitalProductCommand) {
        // TODO perform checks
        storeDigitalProductPort.storeDigitalProduct(createDigitalProductCommand);
    }

}
