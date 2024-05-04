package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateFiguraCommand;

public interface StoreFiguraPort {
    public void storeFigura(CreateFiguraCommand createFiguraCommand);
}
