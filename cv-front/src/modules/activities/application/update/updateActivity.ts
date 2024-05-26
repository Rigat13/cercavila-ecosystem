import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity, ensureActivityIsValid} from "@/modules/activities/domain/Activity";

export async function updateActivity(activityRepository: ActivityRepository, activity: Activity): Promise<void> {
    ensureActivityIsValid(activity);
    await activityRepository.updateActivity(activity);
}
