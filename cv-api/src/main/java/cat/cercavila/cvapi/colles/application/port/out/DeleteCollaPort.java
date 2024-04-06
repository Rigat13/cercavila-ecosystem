package cat.cercavila.cvapi.colles.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;

public interface DeleteCollaPort {
    public void deleteColla(DeleteCollaCommand deleteCollaCommand);
}
