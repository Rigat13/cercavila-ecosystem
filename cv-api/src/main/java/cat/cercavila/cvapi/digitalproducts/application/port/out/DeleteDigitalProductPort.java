package cat.cercavila.cvapi.digitalproducts.application.port.out;

import cat.cercavila.cvapi.digitalproducts.application.port.in.delete.DeleteDigitalProductCommand;

public interface DeleteDigitalProductPort {
    public void deleteDigitalProduct(DeleteDigitalProductCommand deleteDigitalProductCommand);
}
