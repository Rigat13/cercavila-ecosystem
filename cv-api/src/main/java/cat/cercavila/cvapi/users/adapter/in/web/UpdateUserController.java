package cat.cercavila.cvapi.users.adapter.in.web;

import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.update.UpdateUserUseCase;
import cat.cercavila.cvapi.users.application.service.exception.UserNicknameAlreadyExists;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UpdateUserController {
    private UpdateUserUseCase updateUserUseCase;

    public UpdateUserController(UpdateUserUseCase updateUserUseCase) { this.updateUserUseCase = updateUserUseCase; }

    @PutMapping("/api/users")
    public ResponseEntity<?> updateUser(@ModelAttribute UpdateUserCommand updateUserCommand) {
        try { updateUserUseCase.updateUser(updateUserCommand);;return ResponseEntity.ok().build();
        } catch (UserNicknameAlreadyExists e) { return ResponseEntity.status(HttpStatus.CONFLICT).body("El nom d'usuari ja existeix."); }
    }
}
