package cat.cercavila.cvapi.users.application.port.in.update;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface UpdateUserUseCase {
    void updateColla(@Valid UpdateUserCommand updateUserCommand);
}
