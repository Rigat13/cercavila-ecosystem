package cat.cercavila.cvapi.activities.application.port.out;

import cat.cercavila.cvapi.activities.application.port.in.update.UpdateActivityCommand;

public interface UpdateActivityPort {
    public void updateActivity(UpdateActivityCommand updateActivityCommand);
}
