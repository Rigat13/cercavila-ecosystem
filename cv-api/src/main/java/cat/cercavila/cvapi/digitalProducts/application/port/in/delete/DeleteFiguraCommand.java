package cat.cercavila.cvapi.digitalProducts.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteFiguraCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
