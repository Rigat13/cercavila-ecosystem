import {Activity} from './Activity';

export interface ActivityRepository {
    storeActivity: (activity: Activity) => Promise<void>;
    getActivityById:(id: string) => Promise<Activity | null>;
    getActivityByQuestion:(question: string) => Promise<Activity | null>;
    getAllActivitiesByQuestion:() => Promise<Activity[]>;
    getAllActivitiesByType:() => Promise<Activity[]>;
    getAllActivities:() => Promise<Activity[]>;
    getAllActivitiesNoImage:() => Promise<Activity[]>;
    updateActivity:(activity: Activity) => Promise<void>;
    deleteActivity:(id: string) => Promise<void>;
}