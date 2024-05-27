package cat.cercavila.cvapi.event.adapter.in.web;

import cat.cercavila.cvapi.event.application.port.in.delete.DeleteEventCommand;
import cat.cercavila.cvapi.event.application.port.in.delete.DeleteEventUseCase;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteEventController {
    private DeleteEventUseCase deleteEventUseCase;

    public DeleteEventController(DeleteEventUseCase deleteEventUseCase) { this.deleteEventUseCase = deleteEventUseCase; }

    @DeleteMapping("/api/digitalproducts")
    public void deleteEvent(@RequestBody DeleteEventCommand deleteEventCommand) {
        deleteEventUseCase.deleteEvent(deleteEventCommand);
    }
}
