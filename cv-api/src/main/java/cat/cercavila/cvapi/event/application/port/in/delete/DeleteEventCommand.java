package cat.cercavila.cvapi.event.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteEventCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
