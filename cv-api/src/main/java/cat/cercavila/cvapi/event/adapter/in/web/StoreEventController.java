package cat.cercavila.cvapi.event.adapter.in.web;

import cat.cercavila.cvapi.event.application.port.in.create.CreateEventCommand;
import cat.cercavila.cvapi.event.application.port.in.create.CreateEventUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreEventController {
    private CreateEventUseCase createEventUseCase;

    public StoreEventController(CreateEventUseCase createEventUseCase) {
        this.createEventUseCase = createEventUseCase;
    }

    @PostMapping("/api/digitalproducts")
    public void storeEvent(@ModelAttribute CreateEventCommand createEventCommand) {
        createEventUseCase.createEvent(createEventCommand);
    }
}
