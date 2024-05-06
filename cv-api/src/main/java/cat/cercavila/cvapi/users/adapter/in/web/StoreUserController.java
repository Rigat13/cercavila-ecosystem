package cat.cercavila.cvapi.users.adapter.in.web;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.create.CreateUserUseCase;
import cat.cercavila.cvapi.users.application.service.exception.UserNicknameAlreadyExists;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StoreUserController {
    private CreateUserUseCase createUserUseCase;

    public StoreUserController(CreateUserUseCase createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    @PostMapping("/api/users")
    public ResponseEntity<?> storeUser(@ModelAttribute CreateUserCommand createUserCommand) {
        try { createUserUseCase.createUser(createUserCommand); return ResponseEntity.ok().build();
        } catch (UserNicknameAlreadyExists e) { return ResponseEntity.status(HttpStatus.CONFLICT).body("El nom d'usuari ja existeix."); }
    }
}
