package cat.cercavila.cvapi.users.adapter.in.web;

import cat.cercavila.cvapi.users.application.port.in.delete.DeleteUserCommand;
import cat.cercavila.cvapi.users.application.port.in.delete.DeleteUserUseCase;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeleteUserController {
    private DeleteUserUseCase deleteUserUseCase;

    public DeleteUserController(DeleteUserUseCase deleteUserUseCase) { this.deleteUserUseCase = deleteUserUseCase; }

    @DeleteMapping("/api/users")
    public void deleteUser(@RequestBody DeleteUserCommand deleteUserCommand) {
        deleteUserUseCase.deleteUser(deleteUserCommand);
    }
}
