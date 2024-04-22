package cat.cercavila.cvapi.figures.application.port.in.create;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface CreateFiguraUseCase {
    void createColla(@Valid CreateCollaCommand createCollaCommand);
}
