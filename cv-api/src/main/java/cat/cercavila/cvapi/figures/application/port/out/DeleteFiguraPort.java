package cat.cercavila.cvapi.figures.application.port.out;

import cat.cercavila.cvapi.figures.application.port.in.delete.DeleteFiguraCommand;

public interface DeleteFiguraPort {
    public void deleteFigura(DeleteFiguraCommand deleteFiguraCommand);
}
