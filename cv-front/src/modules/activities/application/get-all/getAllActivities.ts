import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity} from "@/modules/activities/domain/Activity";
import {EventRepository} from "../../../events/domain/EventRepository";

export async function getAllActivities(activityRepository: ActivityRepository): Promise<Activity[]> {
    return activityRepository.getAllActivities();
}

export async function getAllActivities_eventRepo(eventRepository: EventRepository): Promise<Activity[]> {
    return eventRepository.getAllActivities();
}