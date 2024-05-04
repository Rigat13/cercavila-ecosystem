package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteDigitalProductCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteDigitalProductUseCase;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteDigitalProductController {
    private DeleteDigitalProductUseCase deleteDigitalProductUseCase;

    public DeleteDigitalProductController(DeleteDigitalProductUseCase deleteDigitalProductUseCase) { this.deleteDigitalProductUseCase = deleteDigitalProductUseCase; }

    @DeleteMapping("/api/figures")
    public void deleteFigura(@RequestBody DeleteDigitalProductCommand deleteDigitalProductCommand) {
        deleteDigitalProductUseCase.deleteFigura(deleteDigitalProductCommand);
    }
}
