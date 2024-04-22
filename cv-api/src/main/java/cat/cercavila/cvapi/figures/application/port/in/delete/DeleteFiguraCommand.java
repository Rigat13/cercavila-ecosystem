package cat.cercavila.cvapi.figures.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteFiguraCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
