package cat.cercavila.cvapi.colles.application.port.in.create;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.*;

public record CreateCollaCommand(
    String id,
    @NotNull (message = "El nom no pot ser nul.")
    @Size(min=3, max=255, message="El nom ha de tenir entre 3 i 255 caràcters.")
    String name,
    @NotNull (message = "L'entitat no pot ser nul·la.")
    @Size(min=3, max=255, message="L'entitat ha de tenir entre 3 i 255 caràcters.")
    String entity,
    @NotNull (message = "L'any de fundació no pot ser nul.")
    @Min(value = 1400, message = "L'any de fundació ha de ser superior a 1400.")
    @Max(value = 2400, message = "L'any de fundació no pot ser superior a 2400.")
    int foundationYear,
    String description,

    @Pattern(regexp =
            "^(collaTypeInstitutional" +
             "|collaTypeNeighbourhood" +
             "|collaTypeStreet" +
             "|collaTypeEntity" +
             "|collaTypeTheatrical" +
             "|collaTypeScout" +
             "|collaTypeNursingHome" +
             "|collaTypeSportsClub" +
             "|collaTypeSchool" +
             "|collaTypeInstitute" +
             "|collaTypeNursery" +
             "|collaTypePrivate)$",
            message = "El tipus no és un dels valors permesos."
    )
    String type,


    @Pattern(regexp =
            "^(neighbourhoodCentre" +
                    "|neighbourhoodEixample" +
                    "|neighbourhoodPlaDenBoet" +
                    "|neighbourhoodCerdanyola" +
                    "|neighbourhoodPeramasEsmandies" +
                    "|neighbourhoodLaLlantia" +
                    "|neighbourhoodViaEuropaNouParcCentral" +
                    "|neighbourhoodCirera" +
                    "|neighbourhoodElsMolins" +
                    "|neighbourhoodVistaAlegre" +
                    "|neighbourhoodRocafonda" +
                    "|neighbourhoodElPalau" +
                    "|neighbourhoodLesSantesEscorxador" +
                    "|neighbourhoodLHavana" +
                    "|neighbourhoodLesCincSenies" +
                    "|neighbourhoodVallveric)$",
            message = "El barri no és un dels valors permesos."
    )
    String neighbourhood,
    String primaryColour,
    String secondaryColour,
    MultipartFile logo
) {}
