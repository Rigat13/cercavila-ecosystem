'use client';

import {Activity} from "@/modules/activities/domain/Activity";
import {ActivityRepository} from "@/modules/activities/domain/ActivityRepository";
import React, {createContext, useContext, useEffect, useState} from "react";
import {getAllActivities} from "@/modules/activities/application/get-all/getAllActivities";
import {getAllActivitiesNoImage} from "@/modules/activities/application/get-all/getAllActivitiesNoImage";
import {storeActivity} from "@/modules/activities/application/store/storeActivity";
import {updateActivity} from "@/modules/activities/application/update/updateActivity";
import {deleteActivity} from "@/modules/activities/application/delete/deleteActivity";

export interface ContextState {
    activities: Activity[];
    activitiesNoImage: Activity[];
    createActivity: (activity: { id: string; question: string; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; }) => Promise<void>;
    updateActivity: (activity: { id: string; question: string; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; }) => Promise<void>;
    deleteActivity: (activityId: string) => Promise<void>;
}

export const ActivitiesContext = createContext({} as ContextState);

export const ActivitiesContextProvider = ({
    children,
    repository,
}: React.PropsWithChildren<{ repository: ActivityRepository }>) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [activitiesNoImage, setActivitiesNoImage] = useState<Activity[]>([]);

    async function create({ id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }:
        { id: string; question: string; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; }) {
        await storeActivity(repository, { id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer });
        await getActivities();
    }

    async function getActivities() {
        return getAllActivities(repository).then((activities) => {
            setActivities(activities);
        });
    }

    async function getActivitiesNoImage() {
        return getAllActivitiesNoImage(repository).then((activities) => {
            setActivitiesNoImage(activities);
        });
    }

    async function update({ id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer }:
        { id: string; question: string; year: number; type: string; image: File | null; correctAnswer: string; firstIncorrectAnswer: string; secondIncorrectAnswer: string; }) {
        await updateActivity(repository, { id, question, type, image, correctAnswer, firstIncorrectAnswer, secondIncorrectAnswer });
        await getActivities();
    }

    async function deleteC(activityId: string) {
        await deleteActivity(repository, activityId);
    }

    useEffect(() => {
        getActivitiesNoImage();
        getActivities();
    }, []);

    return (
        <ActivitiesContext.Provider value={{ activities, activitiesNoImage, createActivity: create, updateActivity: update, deleteActivity: deleteC }}>
            {children}
        </ActivitiesContext.Provider>
    );
}

export const useActivitiesContext = () => useContext(ActivitiesContext);

