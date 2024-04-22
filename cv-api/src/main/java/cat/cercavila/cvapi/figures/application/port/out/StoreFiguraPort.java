package cat.cercavila.cvapi.figures.application.port.out;

import cat.cercavila.cvapi.figures.application.port.in.create.CreateFiguraCommand;

public interface StoreFiguraPort {
    public void storeFigura(CreateFiguraCommand createFiguraCommand);
}
