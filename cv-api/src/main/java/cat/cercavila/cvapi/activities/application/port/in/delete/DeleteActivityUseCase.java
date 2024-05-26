package cat.cercavila.cvapi.activities.application.port.in.delete;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteActivityUseCase {
    void deleteFigura(@Valid DeleteActivityCommand deleteActivityCommand);
}
