package cat.cercavila.cvapi.colles.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.update.UpdateCollaUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateCollaController {
    private UpdateCollaUseCase updateCollaUseCase;

    public UpdateCollaController(UpdateCollaUseCase updateCollaUseCase) { this.updateCollaUseCase = updateCollaUseCase; }

    @PutMapping("/api/colles")
    public void updateColla(@ModelAttribute UpdateCollaCommand updateCollaCommand) {
        updateCollaUseCase.updateColla(updateCollaCommand);
    }
}
