import {Activity} from "@/modules/activities/domain/Activity";
import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";

export async function getActivityByQuestion(activityRepository : ActivityRepository, activityQuestion : string) : Promise<Activity | null> {
    return activityRepository.getActivityByQuestion(activityQuestion);
}