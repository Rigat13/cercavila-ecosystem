package cat.cercavila.cvapi.colles.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.CreateCollaCommand;

public interface StoreCollaPort {
    public void storeColla(CreateCollaCommand createCollaCommand);
}
