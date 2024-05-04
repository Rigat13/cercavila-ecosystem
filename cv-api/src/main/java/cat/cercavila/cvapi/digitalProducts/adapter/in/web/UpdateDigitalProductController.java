package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.update.UpdateDigitalProductUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateDigitalProductController {
    private UpdateDigitalProductUseCase updateFiguraUseCase;

    public UpdateDigitalProductController(UpdateDigitalProductUseCase updateFiguraUseCase) { this.updateFiguraUseCase = updateFiguraUseCase; }

    @PutMapping("/api/figures")
    public void updateFigura(@ModelAttribute UpdateDigitalProductCommand updateFiguraCommand) {
        updateFiguraUseCase.updateDigitalProduct(updateFiguraCommand);
    }
}
