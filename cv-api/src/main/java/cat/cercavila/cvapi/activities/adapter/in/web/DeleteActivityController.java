package cat.cercavila.cvapi.activities.adapter.in.web;

import cat.cercavila.cvapi.activities.application.port.in.delete.DeleteActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.delete.DeleteActivityUseCase;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteActivityController {
    private DeleteActivityUseCase deleteActivityUseCase;

    public DeleteActivityController(DeleteActivityUseCase deleteActivityUseCase) { this.deleteActivityUseCase = deleteActivityUseCase; }

    @DeleteMapping("/api/figures")
    public void deleteFigura(@RequestBody DeleteActivityCommand deleteActivityCommand) {
        deleteActivityUseCase.deleteFigura(deleteActivityCommand);
    }
}
