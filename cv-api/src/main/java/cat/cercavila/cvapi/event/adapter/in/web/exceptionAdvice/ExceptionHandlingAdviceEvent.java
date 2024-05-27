package cat.cercavila.cvapi.event.adapter.in.web.exceptionAdvice;

import cat.cercavila.cvapi.event.application.service.exception.EventAlreadyExists;
import cat.cercavila.cvapi.event.application.service.exception.EventNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlingAdviceEvent {
    @ResponseBody
    @ExceptionHandler(EventNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String eventNotFoundHandler(EventNotFound ex) { return ex.getMessage(); }

    @ResponseBody
    @ExceptionHandler(EventAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String eventAlreadyExistsHandler(EventAlreadyExists ex) { return ex.getMessage(); }
}
