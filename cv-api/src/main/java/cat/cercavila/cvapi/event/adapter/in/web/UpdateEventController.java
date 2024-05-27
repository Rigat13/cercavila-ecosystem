package cat.cercavila.cvapi.event.adapter.in.web;

import cat.cercavila.cvapi.event.application.port.in.update.UpdateEventCommand;
import cat.cercavila.cvapi.event.application.port.in.update.UpdateEventUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateEventController {
    private UpdateEventUseCase updateEventUseCase;

    public UpdateEventController(UpdateEventUseCase updateEventUseCase) { this.updateEventUseCase = updateEventUseCase; }

    @PutMapping("/api/digitalproducts")
    public void updateEvent(@ModelAttribute UpdateEventCommand updateEventCommand) {
        updateEventUseCase.updateEvent(updateEventCommand);
    }
}
