package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.figures.application.port.in.create.CreateFiguraUseCase;
import cat.cercavila.cvapi.figures.application.port.in.create.CreateFiguraCommand;
import org.springframework.web.bind.annotation.*;

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
