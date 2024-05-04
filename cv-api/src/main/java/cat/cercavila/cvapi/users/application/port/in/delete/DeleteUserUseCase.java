package cat.cercavila.cvapi.users.application.port.in.delete;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteUserUseCase {
    void deleteColla(@Valid DeleteUserCommand deleteUserCommand);
}
