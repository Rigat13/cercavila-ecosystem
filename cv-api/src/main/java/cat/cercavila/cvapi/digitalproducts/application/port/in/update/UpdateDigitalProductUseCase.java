package cat.cercavila.cvapi.digitalproducts.application.port.in.update;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface UpdateDigitalProductUseCase {
    void updateDigitalProduct(@Valid UpdateDigitalProductCommand updateFiguraCommand);
}
