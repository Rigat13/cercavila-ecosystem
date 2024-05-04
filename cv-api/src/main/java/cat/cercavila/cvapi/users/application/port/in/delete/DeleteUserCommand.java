package cat.cercavila.cvapi.users.application.port.in.delete;

import javax.validation.constraints.NotNull;

public record DeleteUserCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id) {
}
