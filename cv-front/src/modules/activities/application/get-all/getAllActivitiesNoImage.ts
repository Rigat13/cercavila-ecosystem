import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity} from "@/modules/activities/domain/Activity";
import {EventRepository} from "../../../events/domain/EventRepository";

export async function getAllActivitiesNoImage(activityRepository: ActivityRepository): Promise<Activity[]> {
    return activityRepository.getAllActivitiesNoImage();
}

export async function getAllActivitiesNoImage_eventRepo(eventRepository: EventRepository): Promise<Activity[]> {
    return eventRepository.getAllActivitiesNoImage();
}