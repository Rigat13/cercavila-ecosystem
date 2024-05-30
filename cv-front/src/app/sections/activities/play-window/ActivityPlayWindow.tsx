import React, { useEffect, useState } from 'react';
import styles from './ActivityPlayWindow.module.scss';
import { dictionary } from "@/content";
import confetti from 'canvas-confetti';
import { Activity } from "@/modules/activities/domain/Activity";

export function ActivityPlayWindow({ activity, onClose, lang }: { activity: Activity; onClose: () => void; lang: string }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [activityAnswered, setActivityAnswered] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
    const [answerButtons, setAnswerButtons] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    useEffect(() => {
        if (activity.image) {
            const blob = base64ToBlob(activity.image as unknown as string);
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        }

        // Shuffle and set answer buttons
        const answers = [activity.correctAnswer, activity.firstIncorrectAnswer, activity.secondIncorrectAnswer];
        setAnswerButtons(answers.sort(() => Math.random() - 0.5));
    }, [activity.image]);

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setActivityAnswered(true);
        if (answer === activity.correctAnswer) {
            setIsCorrectAnswer(true);
            confetti({
                zIndex: 200,
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setIsCorrectAnswer(false);
        }
    };

    const handleClose = () => {
        setActivityAnswered(false);
        setIsCorrectAnswer(null);
        setSelectedAnswer(null);
        onClose();
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                {imageUrl && (
                    <div className={styles.image}>
                        <img
                            src={imageUrl}
                            alt={`Image of ${activity.question}`}
                        />
                    </div>
                )}
                <button className={styles.closePopupButton} type="button" onClick={handleClose}>×</button>

                <div className={styles.triviaSection}>
                    <h2 className={styles.triviaQuestion}>{activity.question}</h2>
                    {answerButtons.map((answer, index) => (
                        <button
                            key={index}
                            className={`${styles.answerButton} ${
                                activityAnswered
                                    ? answer === activity.correctAnswer
                                        ? styles.correct
                                        : styles.incorrect
                                    : ''
                            } ${
                                answer === selectedAnswer
                                    ? styles.selected
                                    : ''
                            }`}
                            onClick={() => !activityAnswered && handleAnswerClick(answer)}
                            disabled={activityAnswered}
                        >
                            {answer}
                        </button>
                    ))}
                </div>

                {activityAnswered && isCorrectAnswer && (
                    <p className={styles.superCongratulationsTitle}>
                        {dictionary[lang]?.activityCorrect}
                    </p>
                )}

                {activityAnswered && isCorrectAnswer === false && (
                    <p className={styles.superSadTitle}>
                        {dictionary[lang]?.activityIncorrect}
                    </p>
                )}

                {activityAnswered && (
                    <button className={styles.cancelButton} onClick={handleClose}>
                        {dictionary[lang]?.digitalProductCancelBuyButton}
                    </button>
                )}
            </div>
        </div>
    );
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
