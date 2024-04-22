package cat.cercavila.cvapi.figures.application.port.out;

import cat.cercavila.cvapi.figures.application.port.in.update.UpdateFiguraCommand;

public interface UpdateFiguraPort {
    public void updateFigura(UpdateFiguraCommand updateFiguraCommand);
}
