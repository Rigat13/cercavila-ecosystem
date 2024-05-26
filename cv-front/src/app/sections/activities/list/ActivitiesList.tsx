import { useEffect, useState } from 'react';
import { ActivityCard } from "@/app/sections/activities/card/ActivityCard";
import { useActivitiesContext } from "@/app/sections/activities/ActivitiesContext";
import styles from "./ActivitiesList.module.scss";
import { dictionary } from "@/content";

export function ActivitiesList({ lang }: { lang: string }) {
    const { activitiesNoImage, activities } = useActivitiesContext();
    const [loadedActivities, setLoadedActivities] = useState([]);
    const [isActivitiesImagesLoaded, setIsActivitiesImagesLoaded] = useState(false);

    useEffect(() => {
        if (activities.length > 0) {
            // Map loaded activities using the existing activities and their IDs
            const mappedLoadedActivities = activities.map((figure) => {
                // Find the corresponding figure in activitiesNoImage using the figure ID
                const existingActivity = activitiesNoImage.find((fig) => fig.id === figure.id);
                // If the corresponding figure exists in activitiesNoImage, return it with loaded image data
                if (existingActivity) {
                    return { ...existingActivity, ...figure };
                }
                // If the corresponding figure doesn't exist in activitiesNoImage, return the original figure
                return figure;
            });
            setLoadedActivities(mappedLoadedActivities);
            setIsActivitiesImagesLoaded(true);
        }
    }, [activities, activitiesNoImage]);


    return (
        <section>
            <h2 className={styles.h2}>{dictionary[lang]?.activitiesTitle}</h2>
            <div className={styles.list}>
                {/* Render activities with no images */}
                {!isActivitiesImagesLoaded && activitiesNoImage.map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} lang={lang}/>
                ))}
                {/* Render loaded activities with images */}
                {isActivitiesImagesLoaded && loadedActivities.map((loadedActivity) => (
                    <ActivityCard key={loadedActivity.id} activity={loadedActivity} lang={lang}/>
                ))}
            </div>
        </section>
    )
}
