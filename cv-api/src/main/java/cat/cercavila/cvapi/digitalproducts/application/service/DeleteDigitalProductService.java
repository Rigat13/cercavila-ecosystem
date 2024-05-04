package cat.cercavila.cvapi.digitalproducts.application.service;

import cat.cercavila.cvapi.digitalproducts.application.port.in.delete.DeleteDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.in.delete.DeleteDigitalProductUseCase;
import cat.cercavila.cvapi.digitalproducts.application.port.out.DeleteDigitalProductPort;
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
