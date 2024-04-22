package cat.cercavila.cvapi.figures.adapter.in.web.exceptionAdvice;

import cat.cercavila.cvapi.figures.application.service.exception.FiguraAlreadyExists;
import cat.cercavila.cvapi.figures.application.service.exception.FiguraNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlingAdviceFigura {
    @ResponseBody
    @ExceptionHandler(FiguraNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String figuraNotFoundHandler(FiguraNotFound ex) { return ex.getMessage(); }

    @ResponseBody
    @ExceptionHandler(FiguraAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String figuraAlreadyExistsHandler(FiguraAlreadyExists ex) { return ex.getMessage(); }
}
