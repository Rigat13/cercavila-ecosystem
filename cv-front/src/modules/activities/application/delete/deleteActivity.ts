import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {ensureActivityIdIsValid} from "@/modules/activities/domain/Activity";

export async function deleteActivity(activityRepository: ActivityRepository, activityId : string): Promise<void> {
    ensureActivityIdIsValid(activityId);
    await activityRepository.deleteActivity(activityId);
}
