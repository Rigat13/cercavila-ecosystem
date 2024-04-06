package cat.cercavila.cvapi.colles.application.port.in.delete;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record DeleteCollaCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
