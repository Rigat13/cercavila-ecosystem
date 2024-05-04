package cat.cercavila.cvapi.digitalproducts.application.port.out;

import cat.cercavila.cvapi.digitalproducts.application.port.in.create.CreateDigitalProductCommand;

public interface StoreDigitalProductPort {
    public void storeDigitalProduct(CreateDigitalProductCommand createDigitalProductCommand);
}
