package cat.cercavila.cvapi.colles.application.port.in.update;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface UpdateCollaUseCase {
    void updateColla(@Valid UpdateCollaCommand updateCollaCommand);
}
