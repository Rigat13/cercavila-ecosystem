package cat.cercavila.cvapi.events.application.port.in.update;

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

        @Pattern(regexp =
                "^(eventTypeCercampionatMensual" +
                        "|eventTypeCercampionatAnual" +
                        "|eventTypeCelebracio" +
                        "|eventTypeCompensacio)$",
                message = "El tipus no és un dels valors permesos."
        )
        String type,
        String startDate,
        String endDate,
        String cercatrivies,

        @DecimalMin(value = "0.0", message = "La recompensa ha de ser superior a 0.")
        float firstCoinsReward,
        String firstDigitalProductsReward,
        @DecimalMin(value = "0.0", message = "La recompensa ha de ser superior a 0.")
        float secondCoinsReward,
        String secondDigitalProductsReward,
        @DecimalMin(value = "0.0", message = "La recompensa ha de ser superior a 0.")
        float thirdCoinsReward,
        String thirdDigitalProductsReward,
        @DecimalMin(value = "0.0", message = "La recompensa ha de ser superior a 0.")
        float fourthTenthCoinsReward,
        String fourthTenthDigitalProductsReward,
        @DecimalMin(value = "0.0", message = "La recompensa ha de ser superior a 0.")
        float allCoinsReward,
        String allDigitalProductsReward
    ) {}
