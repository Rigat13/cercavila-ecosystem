package cat.cercavila.cvapi.activities.adapter.out.persistence;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.domain.Activity;

public class MapperActivityActivityEntity {
    public static Activity figuraEntityToFigura(ActivityEntity activityEntity) {
        Activity activity = new Activity(activityEntity.getName(), activityEntity.getYear(), activityEntity.getType(), activityEntity.getImageKey(), activityEntity.getWebUrl());
        // NOTE: Created from zero, with new ID. // TODO Check if this is true
        return activity;
    }

    public static ActivityEntity figuraToFiguraEntity(Activity activity) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(activity.getId());
        activityEntity.setName(activity.getQuestion());
        activityEntity.setYear(activity.getYear());
        activityEntity.setType(activity.getType());
        activityEntity.setImageKey(activity.getImageKey());
        activityEntity.setWebUrl(activity.getCorrectAnswer());

        return activityEntity;
    }

    public static ActivityEntity figuraListingToFiguraEntity(ActivityListing currentActivityListing) {
        ActivityEntity activityEntity = new ActivityEntity();
        activityEntity.setId(currentActivityListing.id());
        activityEntity.setName(currentActivityListing.name());
        activityEntity.setYear(currentActivityListing.year());
        activityEntity.setType(currentActivityListing.type());
        activityEntity.setImageKey(currentActivityListing.imageKey());
        activityEntity.setWebUrl(currentActivityListing.webUrl());

        return activityEntity;
    }
}
