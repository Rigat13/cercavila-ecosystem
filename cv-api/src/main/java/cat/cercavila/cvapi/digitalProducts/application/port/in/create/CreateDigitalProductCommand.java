package cat.cercavila.cvapi.digitalProducts.application.port.in.create;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

public record CreateDigitalProductCommand(
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
            "^(digitalProductTypeUserImage" +
             "|digitalProductTypeUserImageFrame" +
             "|digitalProductTypeUserBackgroundImage" +
             "|digitalProductTypeUserTitle" +
             "|digitalProductTypeUserBackgroundColour" +
             "|digitalProductTypeSticker" +
             "|digitalProductTypePin)$",
            message = "El tipus no és un dels valors permesos."
    )
    String type
) {}
