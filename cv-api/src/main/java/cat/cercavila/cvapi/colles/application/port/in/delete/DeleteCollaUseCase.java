package cat.cercavila.cvapi.colles.application.port.in.delete;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteCollaUseCase {
    void deleteColla(@Valid DeleteCollaCommand deleteCollaCommand);
}
