package cat.cercavila.cvapi.figures.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;

public interface DeleteFiguraPort {
    public void deleteColla(DeleteCollaCommand deleteCollaCommand);
}
