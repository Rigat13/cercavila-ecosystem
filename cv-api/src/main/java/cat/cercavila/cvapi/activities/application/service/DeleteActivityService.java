package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.delete.DeleteActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.delete.DeleteActivityUseCase;
import cat.cercavila.cvapi.activities.application.port.out.DeleteActivityPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteActivityService implements DeleteActivityUseCase {
    private final DeleteActivityPort deleteActivityPort;

    public DeleteActivityService(DeleteActivityPort deleteActivityPort) {
        this.deleteActivityPort = deleteActivityPort;
    }

    @Override
    public void deleteActivity(DeleteActivityCommand deleteActivityCommand) {
        // TODO perform checks
        deleteActivityPort.deleteActivity(deleteActivityCommand);
    }
}
