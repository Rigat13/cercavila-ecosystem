package cat.cercavila.cvapi.digitalproducts.application.port.in.create;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface CreateDigitalProductUseCase {
    void createDigitalProduct(@Valid CreateDigitalProductCommand createDigitalProductCommand);
}
