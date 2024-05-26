package cat.cercavila.cvapi.activities.adapter.in.web;

import cat.cercavila.cvapi.activities.application.port.in.answer.AnswerActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.answer.AnswerActivityUseCase;
import org.springframework.web.bind.annotation.*;

@RestController
public class AnswerActivityController {
    private AnswerActivityUseCase answerActivityUseCase;

    public AnswerActivityController(AnswerActivityUseCase answerActivityUseCase) { this.answerActivityUseCase = answerActivityUseCase; }

    @PutMapping("/api/activities/answer")
    public float answerActivity(@RequestBody AnswerActivityCommand answerActivityCommand) {
        return answerActivityUseCase.answerActivity(answerActivityCommand);
    }
}
