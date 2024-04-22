package cat.cercavila.cvapi.figures.application.port.in.delete;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface DeleteFiguraUseCase {
    void deleteFigura(@Valid DeleteFiguraCommand deleteFiguraCommand);
}
