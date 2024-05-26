package cat.cercavila.cvapi.activities.adapter.in.web.exceptionAdvice;

import cat.cercavila.cvapi.activities.application.service.exception.ActivityAlreadyExists;
import cat.cercavila.cvapi.activities.application.service.exception.ActivityNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlingAdviceActivity {
    @ResponseBody
    @ExceptionHandler(ActivityNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String activityNotFoundHandler(ActivityNotFound ex) { return ex.getMessage(); }

    @ResponseBody
    @ExceptionHandler(ActivityAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String activityAlreadyExistsHandler(ActivityAlreadyExists ex) { return ex.getMessage(); }
}
