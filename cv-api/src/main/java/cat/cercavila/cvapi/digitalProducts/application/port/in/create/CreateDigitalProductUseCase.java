package cat.cercavila.cvapi.digitalProducts.application.port.in.create;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface CreateDigitalProductUseCase {
    void createFigura(@Valid CreateDigitalProductCommand createDigitalProductCommand);
}
