package cat.cercavila.cvapi.colles.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.edit.EditCollaCommand;

public interface EditCollaPort {
    public void editColla(EditCollaCommand editCollaCommand);
}
