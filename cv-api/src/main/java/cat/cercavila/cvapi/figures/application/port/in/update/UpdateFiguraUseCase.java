package cat.cercavila.cvapi.figures.application.port.in.update;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface UpdateFiguraUseCase {
    void updateFigura(@Valid UpdateFiguraCommand updateFiguraCommand);
}
