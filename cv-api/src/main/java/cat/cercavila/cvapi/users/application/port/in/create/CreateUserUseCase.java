package cat.cercavila.cvapi.users.application.port.in.create;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface CreateUserUseCase {
    void createUser(@Valid CreateUserCommand createUserCommand);
}
