package cat.cercavila.cvapi.events.application.port.out;

import cat.cercavila.cvapi.events.application.port.in.update.UpdateEventCommand;

public interface UpdateEventPort {
    public void updateEvent(UpdateEventCommand updateFiguraCommand);
}
