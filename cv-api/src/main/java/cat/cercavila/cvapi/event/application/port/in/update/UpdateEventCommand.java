package cat.cercavila.cvapi.event.application.port.in.update;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public record UpdateEventCommand(
        String id,

        @NotNull (message = "El nom no pot ser nul.")
        @Size(min=3, max=255, message="El nom ha de tenir entre 3 i 255 caràcters.")
        String name,

        String description,
        MultipartFile image,
        String primaryColour,
        String secondaryColour,


        @NotNull (message = "El preu no pot ser nul.")
        @DecimalMin(value = "0.0", message = "El preu ha de ser superior a 0.")
        float price,

        @Pattern(regexp =
                "^(eventTypeUserImage" +
                        "|eventTypeUserImageFrame" +
                        "|eventTypeUserBackgroundImage" +
                        "|eventTypeUserTitle" +
                        "|eventTypeUserBackgroundColour" +
                        "|eventTypeSticker" +
                        "|eventTypePin)$",
                message = "El tipus no és un dels valors permesos."
        )
        String type
    ) {}
