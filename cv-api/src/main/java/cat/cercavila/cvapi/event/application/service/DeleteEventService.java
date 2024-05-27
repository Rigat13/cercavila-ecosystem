package cat.cercavila.cvapi.event.application.service;

import cat.cercavila.cvapi.event.application.port.in.delete.DeleteEventCommand;
import cat.cercavila.cvapi.event.application.port.in.delete.DeleteEventUseCase;
import cat.cercavila.cvapi.event.application.port.out.DeleteEventPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteEventService implements DeleteEventUseCase {
    private final DeleteEventPort deleteEventPort;

    public DeleteEventService(DeleteEventPort deleteEventPort) {
        this.deleteEventPort = deleteEventPort;
    }

    @Override
    public void deleteEvent(DeleteEventCommand deleteEventCommand) {
        // TODO perform checks
        deleteEventPort.deleteEvent(deleteEventCommand);
    }
}
