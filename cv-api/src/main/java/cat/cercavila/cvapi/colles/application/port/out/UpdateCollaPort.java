package cat.cercavila.cvapi.colles.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;

public interface UpdateCollaPort {
    public void updateColla(UpdateCollaCommand updateCollaCommand);
}
