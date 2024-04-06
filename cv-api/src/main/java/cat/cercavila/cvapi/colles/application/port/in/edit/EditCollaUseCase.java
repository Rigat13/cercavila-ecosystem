package cat.cercavila.cvapi.colles.application.port.in.edit;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface EditCollaUseCase {
    void editColla(@Valid EditCollaCommand editCollaCommand);
}
