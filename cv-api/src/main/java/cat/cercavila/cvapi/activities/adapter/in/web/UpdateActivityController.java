package cat.cercavila.cvapi.activities.adapter.in.web;

import cat.cercavila.cvapi.activities.application.port.in.update.UpdateActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.update.UpdateActivityUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateActivityController {
    private UpdateActivityUseCase updateActivityUseCase;

    public UpdateActivityController(UpdateActivityUseCase updateActivityUseCase) { this.updateActivityUseCase = updateActivityUseCase; }

    @PutMapping("/api/figures")
    public void updateFigura(@ModelAttribute UpdateActivityCommand updateActivityCommand) {
        updateActivityUseCase.updateFigura(updateActivityCommand);
    }
}
