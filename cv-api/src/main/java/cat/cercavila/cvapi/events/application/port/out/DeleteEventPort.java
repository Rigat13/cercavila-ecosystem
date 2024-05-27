package cat.cercavila.cvapi.events.application.port.out;

import cat.cercavila.cvapi.events.application.port.in.delete.DeleteEventCommand;

public interface DeleteEventPort {
    public void deleteEvent(DeleteEventCommand deleteEventCommand);
}
