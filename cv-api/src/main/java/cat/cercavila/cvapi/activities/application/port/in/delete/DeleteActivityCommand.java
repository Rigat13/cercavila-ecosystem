package cat.cercavila.cvapi.activities.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteActivityCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
