package cat.cercavila.cvapi.activities.application.port.out;

import cat.cercavila.cvapi.activities.application.port.in.answer.AnswerActivityCommand;

public interface AnswerActivityPort {
    public void answerActivity(AnswerActivityCommand answerActivityCommand);
}
