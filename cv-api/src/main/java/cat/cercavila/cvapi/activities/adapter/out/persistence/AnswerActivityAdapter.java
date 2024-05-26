package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.answer.AnswerActivityCommand;
import cat.cercavila.cvapi.activities.application.port.out.AnswerActivityPort;
import org.springframework.stereotype.Component;


@Component
public class AnswerActivityAdapter implements AnswerActivityPort {
    private final ActivityRepository activityRepository;

    public AnswerActivityAdapter(ActivityRepository activityRepository) { this.activityRepository = activityRepository; }

    @Override
    public void answerActivity(AnswerActivityCommand answerActivityCommand) {
        //TODO IMPLEMENT
        //activityRepository.answer(answerActivityCommand2ActivityEntity(answerActivityCommand));
    }

    private ActivityEntity answerActivityCommand2ActivityEntity(AnswerActivityCommand answerActivityCommand) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(answerActivityCommand.id()); // IMPORTANT: Here, an existing ID is used to answer the Activity
        // The other fields are not necessary for the deletion
        return activityEntity;
    }
}
