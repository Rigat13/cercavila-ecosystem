package cat.cercavila.cvapi.activities.application.port.in.create;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface CreateActivityUseCase {
    void createFigura(@Valid CreateActivityCommand createActivityCommand);
}
