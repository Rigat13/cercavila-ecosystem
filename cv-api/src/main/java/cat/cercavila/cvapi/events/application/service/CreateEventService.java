package cat.cercavila.cvapi.events.application.service;

import cat.cercavila.cvapi.events.application.port.in.create.CreateEventCommand;
import cat.cercavila.cvapi.events.application.port.in.create.CreateEventUseCase;
import cat.cercavila.cvapi.events.application.port.out.StoreEventPort;
import org.springframework.stereotype.Service;

@Service
public class CreateEventService implements CreateEventUseCase {
    private final StoreEventPort storeEventPort;

    public CreateEventService(StoreEventPort storeEventPort) {
        this.storeEventPort = storeEventPort;
    }

    @Override
    public void createEvent(CreateEventCommand createEventCommand) {
        // TODO perform checks
        storeEventPort.storeEvent(createEventCommand);
    }

}
