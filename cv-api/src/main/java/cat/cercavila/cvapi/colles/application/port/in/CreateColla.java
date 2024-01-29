package cat.cercavila.cvapi.colles.application.port.in;

import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;

@Validated
public interface CreateColla {
    void createColla(@Valid CreateCollaCommand createCollaCommand);
}
