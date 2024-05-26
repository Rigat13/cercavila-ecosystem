package cat.cercavila.cvapi.activities.application.port.in.create;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

public record CreateActivityCommand(
    String id,

    @NotNull (message = "La pregunta no pot ser nul·la.")
    @Size(min=3, max=255, message="La pregunta ha de tenir entre 3 i 255 caràcters.")
    String question,

    @Pattern(regexp = "^(activityTypeCercatrivia" + "|activityTypeGeganquesta)$",
            message = "El tipus no és un dels valors permesos."
    )
    String type,

    MultipartFile image,

    String correctAnswer,
    String firstIncorrectAnswer,
    String secondIncorrectAnswer
) {}
