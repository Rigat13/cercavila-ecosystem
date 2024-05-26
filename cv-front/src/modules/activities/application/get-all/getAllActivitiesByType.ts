import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity} from "@/modules/activities/domain/Activity";

export async function getAllActivitiesByType(activityRepository: ActivityRepository): Promise<Activity[]> {
    return activityRepository.getAllActivitiesByType();
}