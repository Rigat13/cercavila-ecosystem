package cat.cercavila.cvapi.digitalProducts.application.port.in.update;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

public record UpdateDigitalProductCommand(
        String id,

        @NotNull (message = "El nom no pot ser nul.")
        @Size(min=3, max=255, message="El nom ha de tenir entre 3 i 255 caràcters.")
        String name,

        @NotNull (message = "L'any d'estrena no pot ser nul.")
        @Min(value = 1400, message = "L'any d'estrena ha de ser superior a 1400.")
        @Max(value = 2400, message = "L'any d'estrena no pot ser superior a 2400.")
        int year,

        @Pattern(regexp =
                "^(figuraTypeGegant" +
                        "|figuraTypeGeganto" +
                        "|figuraTypeCapgros" +
                        "|figuraTypeNan" +
                        "|figuraTypeBestia" +
                        "|figuraTypeMotxilla)$",
                message = "El tipus no és un dels valors permesos."
        )
        String type,

        MultipartFile image,

        String webUrl
    ) {}
