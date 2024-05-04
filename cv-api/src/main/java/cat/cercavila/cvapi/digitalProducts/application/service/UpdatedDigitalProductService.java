package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateDigitalProductUseCase;
import cat.cercavila.cvapi.digitalProducts.application.port.out.UpdateDigitalProductPort;
import org.springframework.stereotype.Service;

@Service
public class UpdatedDigitalProductService implements UpdateDigitalProductUseCase {
    private final UpdateDigitalProductPort updateFiguraPort;

    public UpdatedDigitalProductService(UpdateDigitalProductPort updateFiguraPort) {
        this.updateFiguraPort = updateFiguraPort;
    }

    @Override
    public void updateFigura(UpdateDigitalProductCommand updateFiguraCommand) {
        // TODO perform checks
        updateFiguraPort.updateFigura(updateFiguraCommand);
    }
}
