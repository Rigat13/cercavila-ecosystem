package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteDigitalProductCommand;

public interface DeleteDigitalProductPort {
    public void deleteFigura(DeleteDigitalProductCommand deleteDigitalProductCommand);
}
