package cat.cercavila.cvapi.activities.application.port.in.answer;

import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;

@Validated
public interface AnswerActivityUseCase {
    float answerActivity(@Valid AnswerActivityCommand answerActivityCommand);
}
