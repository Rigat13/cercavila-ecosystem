import React, { useEffect, useState } from 'react';
import styles from './ActivityPlayWindow.module.scss';
import { dictionary } from "@/content";
import confetti from 'canvas-confetti';
import { Activity } from "@/modules/activities/domain/Activity";

export function ActivityPlayWindow({ activity, onClose, lang, doubleCoins }: { activity: Activity; onClose: () => void; lang: string; doubleCoins: boolean }) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [activityAnswered, setActivityAnswered] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>(null);
    const [answerButtons, setAnswerButtons] = useState<string[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [imageOpacity, setImageOpacity] = useState(1);
    const [imageHeight, setImageHeight] = useState('auto');
    const [isDoubleCoins, setIsDoubleCoins] = useState(false);

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

    useEffect(() => {
        setIsDoubleCoins(doubleCoins);
    }, [doubleCoins]);

    const handleAnswerClick = (answer: string) => {
        setSelectedAnswer(answer);
        setActivityAnswered(true);
        setImageOpacity(0);
        setImageHeight('0');
        if (answer === activity.correctAnswer) {
            setIsCorrectAnswer(true);
            confetti({
                zIndex: 200,
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else { setIsCorrectAnswer(false); }
    };

    const handleClose = () => {
        setActivityAnswered(false);
        setIsCorrectAnswer(null);
        setSelectedAnswer(null);
        setImageOpacity(1);
        setImageHeight('auto');
        onClose();
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                {imageUrl && (
                    <div className={styles.image} style={{ opacity: imageOpacity, height: imageHeight }}>
                        <img
                            src={imageUrl}
                            alt={`Image of ${activity.question}`}
                        />
                    </div>
                )}
                <button className={styles.closePopupButton} type="button" onClick={handleClose}>×</button>
                {activityAnswered && isCorrectAnswer && (
                    <div className={styles.rewardLineContainer}>
                        <div className={styles.rewardLine}>
                            <span className={styles.coins}>
                                {isDoubleCoins ? // TODO Substitute by API call to ask for reward amount, add call to store reward and CLAIM button to claim it directly.
                                    (<span className={styles.coins}>2</span>)
                                    : (<span className={styles.coins}>1</span>)}
                            </span>
                            <img src="/icons/icon-coin.svg" alt="Coin" className={styles.coinIcon} />
                        </div>
                        <p className={styles.superCongratulationsTitle}>
                            {dictionary[lang]?.activityCorrect}
                        </p>
                    </div>
                )}

                {activityAnswered && isCorrectAnswer === false && (
                    <p className={styles.superSadTitle}>
                        {dictionary[lang]?.activityIncorrect}
                    </p>
                )}
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

                {!activityAnswered && (
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