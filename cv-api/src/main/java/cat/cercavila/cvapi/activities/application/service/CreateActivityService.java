package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.create.CreateActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.create.CreateActivityUseCase;
import cat.cercavila.cvapi.activities.application.port.out.StoreActivityPort;
import org.springframework.stereotype.Service;

@Service
public class CreateActivityService implements CreateActivityUseCase {
    private final StoreActivityPort storeActivityPort;

    public CreateActivityService(StoreActivityPort storeActivityPort) {
        this.storeActivityPort = storeActivityPort;
    }

    @Override
    public void createActivity(CreateActivityCommand createActivityCommand) {
        // TODO perform checks
        storeActivityPort.storeActivity(createActivityCommand);
    }

}
