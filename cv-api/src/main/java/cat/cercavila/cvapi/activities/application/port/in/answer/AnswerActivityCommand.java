package cat.cercavila.cvapi.activities.application.port.in.answer;

import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public record AnswerActivityCommand(
        // includes the id of the activity, the answer, the user id, the cercampionat's id to find its publishing id, and the current date is found from current time.
        //TODO IMPLEMENT
        @NotNull(message = "L'identificador no pot ser nul.")
        String id) {
}


