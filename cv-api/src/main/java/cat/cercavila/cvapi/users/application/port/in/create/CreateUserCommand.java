package cat.cercavila.cvapi.users.application.port.in.create;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.util.List;

public record CreateUserCommand(
    String id,
    @NotNull (message = "El nom no pot ser nul.")
    @Size(min=3, max=255, message="El nom ha de tenir entre 3 i 255 caràcters.")
    @Column(unique = true)
    String nickname,
    String name,
    String firstSurname,
    String secondSurname,
    @NotNull (message = "L'adreça de correu electrònic no pot ser nul·la.")
    @Email (message = "L'adreça de correu electrònic no és vàlida.")
    String email,

    @NotNull (message = "La contrasenya no pot ser nul·la.")
    @Size(min=3, max=255, message="La contrasenya ha de tenir entre 3 i 255 caràcters.")
    String password,
    String roles,
    @Min(value = 0, message = "Les monedes no poden ser negatives.")
    float coins,
    String digitalProducts,
    String activeUserImage,
    String activeUserImageFrame,
    String activeUserBackgroundImage,
    String activeUserTitle,
    String activeUserBackgroundColour,
    String activePins
) {}
