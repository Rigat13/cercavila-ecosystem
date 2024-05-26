package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.answer.AnswerActivityCommand;
import cat.cercavila.cvapi.activities.application.port.in.answer.AnswerActivityUseCase;
import cat.cercavila.cvapi.activities.application.port.out.AnswerActivityPort;
import org.springframework.stereotype.Service;

@Service
public class AnswerActivityService implements AnswerActivityUseCase {
    private final AnswerActivityPort answerActivityPort;

    public AnswerActivityService(AnswerActivityPort answerActivityPort) {
        this.answerActivityPort = answerActivityPort;
    }

    @Override
    public float answerActivity(AnswerActivityCommand answerActivityCommand) {
        // TODO IMPLEMENT
        // TODO perform checks
        answerActivityPort.answerActivity(answerActivityCommand);
        return 0; // TODO
        // 1. Get date from Cercampionat if not a Geganquesta
        // 2. Get reward from Activity
        // 3. Update user
    }
}
