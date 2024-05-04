package cat.cercavila.cvapi.digitalproducts.application.port.out;

import cat.cercavila.cvapi.digitalproducts.application.port.in.update.UpdateDigitalProductCommand;

public interface UpdateDigitalProductPort {
    public void updateDigitalProduct(UpdateDigitalProductCommand updateFiguraCommand);
}
