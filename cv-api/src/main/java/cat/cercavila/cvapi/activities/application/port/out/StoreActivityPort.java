package cat.cercavila.cvapi.activities.application.port.out;

import cat.cercavila.cvapi.activities.application.port.in.create.CreateActivityCommand;

public interface StoreActivityPort {
    public void storeFigura(CreateActivityCommand createActivityCommand);
}
