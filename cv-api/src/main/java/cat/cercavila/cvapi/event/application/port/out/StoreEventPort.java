package cat.cercavila.cvapi.event.application.port.out;

import cat.cercavila.cvapi.event.application.port.in.create.CreateEventCommand;

public interface StoreEventPort {
    public void storeEvent(CreateEventCommand createEventCommand);
}
