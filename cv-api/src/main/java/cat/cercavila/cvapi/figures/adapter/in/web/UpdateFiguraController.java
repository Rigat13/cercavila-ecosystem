package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.figures.application.port.in.update.UpdateFiguraCommand;
import cat.cercavila.cvapi.figures.application.port.in.update.UpdateFiguraUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateFiguraController {
    private UpdateFiguraUseCase updateFiguraUseCase;

    public UpdateFiguraController(UpdateFiguraUseCase updateFiguraUseCase) { this.updateFiguraUseCase = updateFiguraUseCase; }

    @PutMapping("/api/figures")
    public void updateFigura(@ModelAttribute UpdateFiguraCommand updateFiguraCommand) {
        updateFiguraUseCase.updateFigura(updateFiguraCommand);
    }
}
