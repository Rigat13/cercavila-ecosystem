package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateFiguraCommand;

public interface UpdateFiguraPort {
    public void updateFigura(UpdateFiguraCommand updateFiguraCommand);
}
