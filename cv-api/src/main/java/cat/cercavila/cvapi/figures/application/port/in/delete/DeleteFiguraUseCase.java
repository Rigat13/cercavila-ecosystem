package cat.cercavila.cvapi.figures.application.port.in.delete;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteFiguraUseCase {
    void deleteColla(@Valid DeleteCollaCommand deleteCollaCommand);
}
