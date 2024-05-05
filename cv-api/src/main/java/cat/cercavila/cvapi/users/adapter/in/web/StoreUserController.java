package cat.cercavila.cvapi.users.adapter.in.web;

import cat.cercavila.cvapi.users.application.port.in.create.CreateUserCommand;
import cat.cercavila.cvapi.users.application.port.in.create.CreateUserUseCase;
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
    public void storeUser(@ModelAttribute CreateUserCommand createUserCommand) {
        createUserUseCase.createUser(createUserCommand);
    }
}
