package cat.cercavila.cvapi.event.application.port.out;

import cat.cercavila.cvapi.event.application.port.in.update.UpdateEventCommand;

public interface UpdateEventPort {
    public void updateEvent(UpdateEventCommand updateFiguraCommand);
}
