package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateDigitalProductCommand;

public interface UpdateDigitalProductPort {
    public void updateDigitalProduct(UpdateDigitalProductCommand updateFiguraCommand);
}
