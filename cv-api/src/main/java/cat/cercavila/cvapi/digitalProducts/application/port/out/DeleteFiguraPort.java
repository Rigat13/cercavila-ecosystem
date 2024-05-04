package cat.cercavila.cvapi.digitalProducts.application.port.out;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteFiguraCommand;

public interface DeleteFiguraPort {
    public void deleteFigura(DeleteFiguraCommand deleteFiguraCommand);
}
