package cat.cercavila.cvapi.activities.adapter.in.web;

import cat.cercavila.cvapi.activities.application.port.in.create.CreateActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.create.CreateActivityUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreActivityController {
    private CreateActivityUseCase createActivityUseCase;

    public StoreActivityController(CreateActivityUseCase createActivityUseCase) {
        this.createActivityUseCase = createActivityUseCase;
    }

    @PostMapping("/api/figures")
    public void storeFigura(@ModelAttribute CreateActivityCommand createActivityCommand) {
        createActivityUseCase.createFigura(createActivityCommand);
    }
}
