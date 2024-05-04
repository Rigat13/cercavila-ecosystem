package cat.cercavila.cvapi.digitalProducts.application.service;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteDigitalProductUseCase;
import cat.cercavila.cvapi.digitalProducts.application.port.out.DeleteDigitalProductPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteDigitalProductService implements DeleteDigitalProductUseCase {
    private final DeleteDigitalProductPort deleteDigitalProductPort;

    public DeleteDigitalProductService(DeleteDigitalProductPort deleteDigitalProductPort) {
        this.deleteDigitalProductPort = deleteDigitalProductPort;
    }

    @Override
    public void deleteDigitalProduct(DeleteDigitalProductCommand deleteDigitalProductCommand) {
        // TODO perform checks
        deleteDigitalProductPort.deleteDigitalProduct(deleteDigitalProductCommand);
    }
}
