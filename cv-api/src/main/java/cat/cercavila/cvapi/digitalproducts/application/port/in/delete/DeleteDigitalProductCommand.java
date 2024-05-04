package cat.cercavila.cvapi.digitalproducts.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteDigitalProductCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
