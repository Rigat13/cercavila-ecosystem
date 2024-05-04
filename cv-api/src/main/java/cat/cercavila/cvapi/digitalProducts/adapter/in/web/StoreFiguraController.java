package cat.cercavila.cvapi.digitalProducts.adapter.in.web;

import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateFiguraCommand;
import cat.cercavila.cvapi.digitalProducts.application.port.in.create.CreateFiguraUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreFiguraController {
    private CreateFiguraUseCase createFiguraUseCase;

    public StoreFiguraController(CreateFiguraUseCase createFiguraUseCase) {
        this.createFiguraUseCase = createFiguraUseCase;
    }

    @PostMapping("/api/figures")
    public void storeFigura(@ModelAttribute CreateFiguraCommand createFiguraCommand) {
        createFiguraUseCase.createFigura(createFiguraCommand);
    }
}
