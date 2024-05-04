package cat.cercavila.cvapi.users.adapter.in.web.exceptionAdvice;

import cat.cercavila.cvapi.users.application.service.exception.UserAlreadyExists;
import cat.cercavila.cvapi.users.application.service.exception.UserNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlingAdviceUser {
    @ResponseBody
    @ExceptionHandler(UserNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String collaNotFoundHandler(UserNotFound ex) { return ex.getMessage(); }

    @ResponseBody
    @ExceptionHandler(UserAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String collaAlreadyExistsHandler(UserAlreadyExists ex) { return ex.getMessage(); }
}
