package cat.cercavila.cvapi.digitalproducts.adapter.in.web;

import cat.cercavila.cvapi.digitalproducts.application.port.in.update.UpdateDigitalProductCommand;
import cat.cercavila.cvapi.digitalproducts.application.port.in.update.UpdateDigitalProductUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateDigitalProductController {
    private UpdateDigitalProductUseCase updateDigitalProductUseCase;

    public UpdateDigitalProductController(UpdateDigitalProductUseCase updateDigitalProductUseCase) { this.updateDigitalProductUseCase = updateDigitalProductUseCase; }

    @PutMapping("/api/digitalproducts")
    public void updateDigitalProduct(@ModelAttribute UpdateDigitalProductCommand updateDigitalProductCommand) {
        updateDigitalProductUseCase.updateDigitalProduct(updateDigitalProductCommand);
    }
}
