package cat.cercavila.cvapi.colles.application.service;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.out.DeleteCollaPort;
import org.springframework.stereotype.Service;

@Service
public class DeleteCollaService implements DeleteCollaUseCase {
    private final DeleteCollaPort deleteCollaPort;

    public DeleteCollaService(DeleteCollaPort deleteCollaPort) {
        this.deleteCollaPort = deleteCollaPort;
    }

    @Override
    public void deleteColla(DeleteCollaCommand deleteCollaCommand) {
        // TODO perform checks
        deleteCollaPort.deleteColla(deleteCollaCommand);
    }
}
