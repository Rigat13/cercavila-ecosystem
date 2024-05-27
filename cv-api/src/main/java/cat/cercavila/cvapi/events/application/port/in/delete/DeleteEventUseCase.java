package cat.cercavila.cvapi.events.application.port.in.delete;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteEventUseCase {
    void deleteEvent(@Valid DeleteEventCommand deleteEventCommand);
}
