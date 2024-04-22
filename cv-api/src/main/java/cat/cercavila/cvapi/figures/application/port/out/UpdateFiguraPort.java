package cat.cercavila.cvapi.figures.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;

public interface UpdateFiguraPort {
    public void updateColla(UpdateCollaCommand updateCollaCommand);
}
