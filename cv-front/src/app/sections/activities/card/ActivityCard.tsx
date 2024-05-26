import { Activity } from "@/modules/activities/domain/Activity";
import styles from "./ActivityCard.module.scss";
import { defaultLang, dictionary } from "@/content";
import {useEffect, useState} from "react";

export function ActivityCard({ activity, lang }: { activity: Activity; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (activity.image) {
            const blob = base64ToBlob(activity.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }
    }, [activity.image]);

    return (
        <div className={styles.activityCard}>
            {imageUrl && (
                <a href={getWebUrl(activity.webUrl)} target="_blank" className={styles.activityCard__aImage}>
                    <div className={styles.activityCard__image}>
                        <img
                            src={imageUrl}
                            alt={`Imatge de ${activity.question}`}
                        />
                    </div>
                </a>
            )}
            <div className={styles.activityCard__info}>
                <a href={`activities/update.html?activityId=${activity.id}${lang === defaultLang ? '' : `&lang=${lang}`}`}>
                    <button className={styles.updateButton}>
                        <img src="/icons/icon-edit.svg" alt="Editar" />
                    </button>
                </a>
                <h3 className={styles.activityCard__name}>{activity.question}</h3>
                <p className={styles.activityCard__year}>{activity.year}</p>
                <p className={styles.activityCard__type}>{dictionary[lang]?.[activity.type]}</p>

                {activity.webUrl && (
                    <a href={getWebUrl(activity.webUrl)} target="_blank">
                        <button className={styles.outerLink}>
                            <img src="/icons/icon-web.png" alt="Història"/>
                        </button>
                    </a>
                )}
            </div>
        </div>
    );
}

function getWebUrl(url: string): string {
    if (url.startsWith('http:')) {
        return url;
    } else if (url.startsWith('www.gegantsmataro')) {
        return `http://${url}`;
    } else if (url.startsWith('gegantsmataro.cat')) {
        return `http://${url}`;
    }
    return url;
}

function base64ToBlob(base64: string): Blob {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new Blob([bytes], { type: 'image/jpeg' });
}
