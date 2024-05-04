package cat.cercavila.cvapi.digitalproducts.application.service;

import cat.cercavila.cvapi.digitalproducts.application.port.in.update.UpdateDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.in.update.UpdateDigitalProductUseCase;
import cat.cercavila.cvapi.digitalproducts.application.port.out.UpdateDigitalProductPort;
import org.springframework.stereotype.Service;

@Service
public class UpdatedDigitalProductService implements UpdateDigitalProductUseCase {
    private final UpdateDigitalProductPort updateDigitalProductsPort;

    public UpdatedDigitalProductService(UpdateDigitalProductPort updateDigitalProductsPort) {
        this.updateDigitalProductsPort = updateDigitalProductsPort;
    }

    @Override
    public void updateDigitalProduct(UpdateDigitalProductCommand updateDigitalProductsCommand) {
        // TODO perform checks
        updateDigitalProductsPort.updateDigitalProduct(updateDigitalProductsCommand);
    }
}
