import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import {Activity} from "@/modules/activities/domain/Activity";
import {URL_PREFIX} from "@/modules/activities/infrastructure/conactivitytion";

export function createApiActivityRepository(): ActivityRepository {
    return {
        storeActivity, getActivityById, getActivityByQuestion, getAllActivitiesByQuestion,
        getAllActivitiesByType, getAllActivities, updateActivity, deleteActivity, getAllActivitiesNoImage
    };
}

async function storeActivity(activity: Activity) {
    try {
        const formData = new FormData();
        formData.append("id", activity.id);
        formData.append("question", activity.question);
        formData.append("type", activity.type);
        if (activity.image) formData.append("image", activity.image, activity.image.question);
        formData.append("correctAnswer", activity.correctAnswer);
        formData.append("firstIncorrectAnswer", activity.firstIncorrectAnswer);
        formData.append("secondIncorrectAnswer", activity.secondIncorrectAnswer);

        await fetch(URL_PREFIX + "/api/activities", {
            method: "POST",
            body: formData,
        });
    } catch (error) {
        throw new Error("No s'ha pogut crear la activity. \nMotiu: " + error);
    }
}

async function getActivityById(id: string) {
    try {
        const activity = await fetch(URL_PREFIX + `/api/activities/id/${id}`).then(
        (response) => response.json() as Promise<Activity>
        );
        return activity;
    } catch (error) { throw new Error("No s'ha pogut obtenir la activity amb l'id. \nMotiu: " + error); }
}

async function getActivityByQuestion(question: string) {
    try {
        const activity = await fetch(URL_PREFIX + `/api/activities/question/${question}`).then(
        (response) => response.json() as Promise<Activity>
        );
        return activity;
    } catch (error) { throw new Error("No s'ha pogut obtenir la activity amb el nom. \nMotiu: " + error); }
}

async function getAllActivitiesByQuestion() {
    try {
        const activities = await fetch(URL_PREFIX + `/api/activities/question`).then(
            (response) => response.json() as Promise<Activity[]>
        );
        return activities;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les activities ordenades per nom. \nMotiu: " + error); }
}

async function getAllActivitiesByType() {
    try {
        const activities = await fetch(URL_PREFIX + `/api/activities/type`).then(
            (response) => response.json() as Promise<Activity[]>
        );
        return activities;
    } catch (error) { throw new Error("No s'ha pogut obtenir totes les activities ordenades per tipus. \nMotiu: " + error); }

}

async function getAllActivities() {
    try {
        const activities = await fetch(URL_PREFIX + `/api/activities`).then(
            (response) => response.json() as Promise<Activity[]>
        );
        return activities;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les activities. \nMotiu: " + error);
    }
}

async function getAllActivitiesNoImage() {
    try {
        const activities = await fetch(URL_PREFIX + `/api/activities/noimage`).then(
            (response) => response.json() as Promise<Activity[]>
        );
        return activities;
    } catch (error) {
        throw new Error("No s'ha pogut obtenir totes les activities sense imatge. \nMotiu: " + error);
    }
}

async function updateActivity(activity: Activity) {
    try {
        const formData = new FormData();
        formData.append("id", activity.id);
        formData.append("question", activity.question);
        formData.append("type", activity.type);
        if (activity.image) formData.append("image", activity.image, activity.image.question);
        formData.append("correctAnswer", activity.correctAnswer);
        formData.append("firstIncorrectAnswer", activity.firstIncorrectAnswer);
        formData.append("secondIncorrectAnswer", activity.secondIncorrectAnswer);

        await fetch(URL_PREFIX + "/api/activities", {
            method: "PUT",
            body: formData,
        });
    } catch (error) { throw new Error("No s'ha pogut actualitzar la activity. \nMotiu: " + error); }
}

async function deleteActivity(id: string) {
    try {
        await fetch(URL_PREFIX + "/api/activities", {
            method: "DELETE",
            headers: new Headers({
                accept: "application/json",
                "Content-Type": "application/json"
            }),
            body: JSON.stringify({
                id: id,
            }),
        });
    } catch (error) { throw new Error("No s'ha pogut eliminar la activity. \nMotiu: " + error); }
}