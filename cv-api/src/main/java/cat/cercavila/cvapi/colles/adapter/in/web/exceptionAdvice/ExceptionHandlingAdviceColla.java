package cat.cercavila.cvapi.colles.adapter.in.web.exceptionAdvice;

import cat.cercavila.cvapi.colles.application.service.exception.CollaAlreadyExists;
import cat.cercavila.cvapi.colles.application.service.exception.CollaNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlingAdviceColla {
    @ResponseBody
    @ExceptionHandler(CollaNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String collaNotFoundHandler(CollaNotFound ex) { return ex.getMessage(); }

    @ResponseBody
    @ExceptionHandler(CollaAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String collaAlreadyExistsHandler(CollaAlreadyExists ex) { return ex.getMessage(); }
}
