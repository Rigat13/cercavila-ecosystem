package cat.cercavila.cvapi.events.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteEventCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
