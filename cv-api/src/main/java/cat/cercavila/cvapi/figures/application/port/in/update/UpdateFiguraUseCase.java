package cat.cercavila.cvapi.figures.application.port.in.update;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface UpdateFiguraUseCase {
    void updateColla(@Valid UpdateCollaCommand updateCollaCommand);
}
