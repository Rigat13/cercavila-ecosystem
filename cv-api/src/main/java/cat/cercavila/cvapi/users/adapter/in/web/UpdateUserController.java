package cat.cercavila.cvapi.users.adapter.in.web;

import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserUseCase;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateUserController {
    private UpdateUserUseCase updateUserUseCase;

    public UpdateUserController(UpdateUserUseCase updateUserUseCase) { this.updateUserUseCase = updateUserUseCase; }

    @PutMapping("/api/colles")
    public void updateColla(@ModelAttribute UpdateUserCommand updateUserCommand) {
        updateUserUseCase.updateColla(updateUserCommand);
    }
}
