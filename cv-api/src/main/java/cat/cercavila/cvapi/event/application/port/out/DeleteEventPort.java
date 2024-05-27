package cat.cercavila.cvapi.event.application.port.out;

import cat.cercavila.cvapi.event.application.port.in.delete.DeleteEventCommand;

public interface DeleteEventPort {
    public void deleteEvent(DeleteEventCommand deleteEventCommand);
}
