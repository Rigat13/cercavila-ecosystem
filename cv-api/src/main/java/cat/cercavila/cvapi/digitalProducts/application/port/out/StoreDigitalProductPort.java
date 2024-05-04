package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateDigitalProductCommand;

public interface StoreDigitalProductPort {
    public void storeFigura(CreateDigitalProductCommand createDigitalProductCommand);
}
