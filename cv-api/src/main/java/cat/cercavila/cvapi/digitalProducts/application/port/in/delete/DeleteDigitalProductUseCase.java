package cat.cercavila.cvapi.digitalProducts.application.port.in.delete;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteDigitalProductUseCase {
    void deleteDigitalProduct(@Valid DeleteDigitalProductCommand deleteDigitalProductCommand);
}
