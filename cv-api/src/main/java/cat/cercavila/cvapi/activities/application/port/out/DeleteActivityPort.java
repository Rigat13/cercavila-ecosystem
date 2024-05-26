package cat.cercavila.cvapi.activities.application.port.out;

import cat.cercavila.cvapi.activities.application.port.in.delete.DeleteActivityCommand;

public interface DeleteActivityPort {
    public void deleteFigura(DeleteActivityCommand deleteActivityCommand);
}
