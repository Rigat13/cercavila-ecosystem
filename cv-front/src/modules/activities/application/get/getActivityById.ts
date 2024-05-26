import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity} from "@/modules/activities/domain/Activity";

export async function getActivityById(activityRepository : ActivityRepository, activityId : string) : Promise<Activity | null> {
    return activityRepository.getActivityById(activityId);
}