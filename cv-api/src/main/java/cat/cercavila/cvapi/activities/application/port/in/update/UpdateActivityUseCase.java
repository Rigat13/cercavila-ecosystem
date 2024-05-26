package cat.cercavila.cvapi.activities.application.port.in.update;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface UpdateActivityUseCase {
    void updateActivity(@Valid UpdateActivityCommand updateActivityCommand);
}
