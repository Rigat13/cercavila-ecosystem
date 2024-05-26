package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.domain.Activity;

public class MapperActivityActivityEntity {
    public static Activity activityEntityToActivity(ActivityEntity activityEntity) {
        Activity activity = new Activity(activityEntity.getQuestion(), activityEntity.getType(), activityEntity.getImageKey(),
                activityEntity.getCorrectAnswer(), activityEntity.getFirstIncorrectAnswer(), activityEntity.getSecondIncorrectAnswer());
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return activity;
    }

    public static ActivityEntity activityToActivityEntity(Activity activity) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(activity.getId());
        activityEntity.setQuestion(activity.getQuestion());
        activityEntity.setType(activity.getType());
        activityEntity.setImageKey(activity.getImageKey());
        activityEntity.setCorrectAnswer(activity.getCorrectAnswer());
        activityEntity.setFirstIncorrectAnswer(activity.getFirstIncorrectAnswer());
        activityEntity.setSecondIncorrectAnswer(activity.getSecondIncorrectAnswer());

        return activityEntity;
    }

    public static ActivityEntity activityListingToActivityEntity(ActivityListing currentActivityListing) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(currentActivityListing.id());
        activityEntity.setQuestion(currentActivityListing.question());
        activityEntity.setType(currentActivityListing.type());
        activityEntity.setImageKey(currentActivityListing.imageKey());
        activityEntity.setCorrectAnswer(currentActivityListing.correctAnswer());
        activityEntity.setFirstIncorrectAnswer(currentActivityListing.firstIncorrectAnswer());
        activityEntity.setSecondIncorrectAnswer(currentActivityListing.secondIncorrectAnswer());

        return activityEntity;
    }
}
