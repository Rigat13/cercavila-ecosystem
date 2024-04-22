package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaUseCase;
import cat.cercavila.cvapi.colles.application.port.in.create.CreateCollaCommand;
import org.springframework.web.bind.annotation.*;

@RestController
public class StoreFiguraController {
    private CreateCollaUseCase createCollaUseCase;

    public StoreFiguraController(CreateCollaUseCase createCollaUseCase) {
        this.createCollaUseCase = createCollaUseCase;
    }

    @PostMapping("/api/colles")
    public void storeColla(@ModelAttribute CreateCollaCommand createCollaCommand) {
        createCollaUseCase.createColla(createCollaCommand);
    }
}
