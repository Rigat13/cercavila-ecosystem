package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteFiguraCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.delete.DeleteFiguraUseCase;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteFiguraController {
    private DeleteFiguraUseCase deleteFiguraUseCase;

    public DeleteFiguraController(DeleteFiguraUseCase deleteFiguraUseCase) { this.deleteFiguraUseCase = deleteFiguraUseCase; }

    @DeleteMapping("/api/figures")
    public void deleteFigura(@RequestBody DeleteFiguraCommand deleteFiguraCommand) {
        deleteFiguraUseCase.deleteFigura(deleteFiguraCommand);
    }
}
