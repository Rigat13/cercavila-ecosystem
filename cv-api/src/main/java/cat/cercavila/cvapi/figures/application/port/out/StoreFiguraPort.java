package cat.cercavila.cvapi.figures.application.port.out;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;

public interface StoreFiguraPort {
    public void storeColla(CreateCollaCommand createCollaCommand);
}
