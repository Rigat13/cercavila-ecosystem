package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.edit.EditCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.edit.EditCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.out.EditCollaPort;
import org.springframework.stereotype.Service;

@Service
public class EditCollaService implements EditCollaUseCase {
    private final EditCollaPort editCollaPort;

    public EditCollaService(EditCollaPort editCollaPort) {
        this.editCollaPort = editCollaPort;
    }

    @Override
    public void editColla(EditCollaCommand editCollaCommand) {
        // TODO perform checks
        editCollaPort.editColla(editCollaCommand);
    }
}
