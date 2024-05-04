package cat.cercavila.cvapi.digitalProducts.adapter.in.web.exceptionAdvice;

import cat.cercavila.cvapi.digitalProducts.application.service.exception.DigitalProductAlreadyExists;
import cat.cercavila.cvapi.digitalProducts.application.service.exception.DigitalProductNotFound;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandlingAdviceDigitalProduct {
    @ResponseBody
    @ExceptionHandler(DigitalProductNotFound.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String figuraNotFoundHandler(DigitalProductNotFound ex) { return ex.getMessage(); }

    @ResponseBody
    @ExceptionHandler(DigitalProductAlreadyExists.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    String figuraAlreadyExistsHandler(DigitalProductAlreadyExists ex) { return ex.getMessage(); }
}
