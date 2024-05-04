package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateDigitalProductUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreDigitalProductController {
    private CreateDigitalProductUseCase createDigitalProductUseCase;

    public StoreDigitalProductController(CreateDigitalProductUseCase createDigitalProductUseCase) {
        this.createDigitalProductUseCase = createDigitalProductUseCase;
    }

    @PostMapping("/api/digitalproducts")
    public void storeDigitalProduct(@ModelAttribute CreateDigitalProductCommand createDigitalProductCommand) {
        createDigitalProductUseCase.createDigitalProduct(createDigitalProductCommand);
    }
}
