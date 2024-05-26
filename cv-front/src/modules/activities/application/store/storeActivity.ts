import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity, ensureActivityIsValidEmptyId} from "@/modules/activities/domain/Activity";

export async function storeActivity(activityRepository: ActivityRepository, activity: Activity): Promise<void> {
    ensureActivityIsValidEmptyId(activity);
    await activityRepository.storeActivity(activity);
}
