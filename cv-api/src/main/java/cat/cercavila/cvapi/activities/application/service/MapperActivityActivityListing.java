package cat.cercavila.cvapi.activities.application.service;

import cat.cercavila.cvapi.activities.application.port.in.list.ActivityListing;
import cat.cercavila.cvapi.activities.domain.Activity;

public class MapperActivityActivityListing {
    public static Activity activityListingToActivity (ActivityListing activityListing) {
        Activity activity = new Activity(activityListing.question(), activityListing.type(), activityListing.imageKey(), activityListing.correctAnswer(), activityListing.firstIncorrectAnswer(), activityListing.secondIncorrectAnswer());
        // NOTE: We don't set the id because it is autogenerated by the database
        return activity;
    }

    public static ActivityListing activityToActivityListing (Activity activity, byte[] image) {
        ActivityListing activityListing = new ActivityListing(activity.getId(), activity.getQuestion(), activity.getType(),  activity.getImageKey(), image, activity.getCorrectAnswer(), activity.getFirstIncorrectAnswer(), activity.getSecondIncorrectAnswer());
        return activityListing;
    }
}