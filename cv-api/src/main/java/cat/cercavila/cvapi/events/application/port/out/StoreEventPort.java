package cat.cercavila.cvapi.events.application.port.out;

import cat.cercavila.cvapi.events.application.port.in.create.CreateEventCommand;

public interface StoreEventPort {
    public void storeEvent(CreateEventCommand createEventCommand);
}
