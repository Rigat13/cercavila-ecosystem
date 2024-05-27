package cat.cercavila.cvapi.event.application.service;

import cat.cercavila.cvapi.event.application.port.in.update.UpdateEventCommand;
import cat.cercavila.cvapi.event.application.port.in.update.UpdateEventUseCase;
import cat.cercavila.cvapi.event.application.port.out.UpdateEventPort;
import org.springframework.stereotype.Service;

@Service
public class UpdateEventService implements UpdateEventUseCase {
    private final UpdateEventPort updateEventsPort;

    public UpdateEventService(UpdateEventPort updateEventsPort) {
        this.updateEventsPort = updateEventsPort;
    }

    @Override
    public void updateEvent(UpdateEventCommand updateEventsCommand) {
        // TODO perform checks
        updateEventsPort.updateEvent(updateEventsCommand);
    }
}
