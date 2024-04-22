package cat.cercavila.cvapi.figures.application.port.in.create;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface CreateFiguraUseCase {
    void createFigura(@Valid CreateFiguraCommand createFiguraCommand);
}
