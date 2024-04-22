package cat.cercavila.cvapi.figures.adapter.in.web;

import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.delete.DeleteCollaUseCase;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteFiguraController {
    private DeleteCollaUseCase deleteCollaUseCase;

    public DeleteFiguraController(DeleteCollaUseCase deleteCollaUseCase) { this.deleteCollaUseCase = deleteCollaUseCase; }

    @DeleteMapping("/api/colles")
    public void deleteColla(@RequestBody DeleteCollaCommand deleteCollaCommand) {
        deleteCollaUseCase.deleteColla(deleteCollaCommand);
    }
}
