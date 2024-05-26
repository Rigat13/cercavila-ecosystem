package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.update.UpdateActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.update.UpdateActivityUseCase;
import cat.cercavila.cvapi.activities.application.port.out.UpdateActivityPort;
import org.springframework.stereotype.Service;

@Service
public class UpdateActivityService implements UpdateActivityUseCase {
    private final UpdateActivityPort updateActivityPort;

    public UpdateActivityService(UpdateActivityPort updateActivityPort) {
        this.updateActivityPort = updateActivityPort;
    }

    @Override
    public void updateActivity(UpdateActivityCommand updateActivityCommand) {
        // TODO perform checks
        updateActivityPort.updateActivity(updateActivityCommand);
    }
}
