package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.out.StoreCollaPort;
import org.springframework.stereotype.Service;

@Service
public class CreateCollaService implements CreateCollaUseCase {
    private final StoreCollaPort storeCollaPort;

    public CreateCollaService(StoreCollaPort storeCollaPort) {
        this.storeCollaPort = storeCollaPort;
    }

    @Override
    public void createColla(CreateCollaCommand createCollaCommand) {
        // TODO perform checks
        storeCollaPort.storeColla(createCollaCommand);
    }

}
