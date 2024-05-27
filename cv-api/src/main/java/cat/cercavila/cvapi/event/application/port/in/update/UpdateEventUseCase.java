package cat.cercavila.cvapi.event.application.port.in.update;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface UpdateEventUseCase {
    void updateEvent(@Valid UpdateEventCommand updateFiguraCommand);
}
