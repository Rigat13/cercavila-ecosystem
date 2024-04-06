package cat.cercavila.cvapi.colles.adapter.in.web;


import cat.cercavila.cvapi.colles.application.port.in.edit.EditCollaCommand;
import cat.cercavila.cvapi.colles.application.port.in.edit.EditCollaUseCase;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EditCollaController {
    private EditCollaUseCase editCollaUseCase;

    public EditCollaController(EditCollaUseCase editCollaUseCase) { this.editCollaUseCase = editCollaUseCase; }

    @PutMapping("/api/colles")
    public void editColla(@RequestBody EditCollaCommand editCollaCommand) {
        editCollaUseCase.editColla(editCollaCommand);
    }
}
