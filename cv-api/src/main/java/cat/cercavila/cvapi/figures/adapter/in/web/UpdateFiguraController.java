package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateFiguraController {
    private UpdateCollaUseCase updateCollaUseCase;

    public UpdateFiguraController(UpdateCollaUseCase updateCollaUseCase) { this.updateCollaUseCase = updateCollaUseCase; }

    @PutMapping("/api/colles")
    public void updateColla(@ModelAttribute UpdateCollaCommand updateCollaCommand) {
        updateCollaUseCase.updateColla(updateCollaCommand);
    }
}
