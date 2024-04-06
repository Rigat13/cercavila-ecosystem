package cat.cercavila.cvapi.colles.application.port.in.edit;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public record EditCollaCommand(
    @NotNull(message = "L'identificador no pot ser nul.")
    String id,
    @NotNull(message = "El nom no pot ser nul.")
    @Size(min = 3, max = 255, message = "El nom ha de tenir entre 3 i 255 caràcters.")
    String name,
    @NotNull(message = "L'entitat no pot ser nul·la.")
    @Size(min = 3, max = 255, message = "L'entitat ha de tenir entre 3 i 255 caràcters.")
    String entity,
    @NotNull(message = "L'any de fundació no pot ser nul.")
    @Min(value = 1400, message = "L'any de fundació ha de ser superior a 1400.")
    @Max(value = 2400, message = "L'any de fundació no pot ser superior a 2400.")
    int foundationYear) {
}
