package cat.cercavila.cvapi.colles.application.port.in.create;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface CreateCollaUseCase {
    void createColla(@Valid CreateCollaCommand createCollaCommand);
}
