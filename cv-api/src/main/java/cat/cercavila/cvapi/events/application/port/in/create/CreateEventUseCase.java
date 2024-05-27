package cat.cercavila.cvapi.events.application.port.in.create;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface CreateEventUseCase {
    void createEvent(@Valid CreateEventCommand createEventCommand);
}
