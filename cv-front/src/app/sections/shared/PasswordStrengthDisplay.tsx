import React, { useState } from 'react';
import {calculatePasswordStrength, getPasswordStrengthMessage, getStrengthColour} from "@/modules/users/domain/user-attributes/UserPassword";
import styles from "./PasswordStrengthDisplay.module.scss";

export default function PasswordStrengthDisplay({ password, lang }) {
    const [strength, setStrength] = useState(0);
    const updateStrength = (password) => { setStrength(calculatePasswordStrength(password)); };

    React.useEffect(() => {
        updateStrength(password);
    }, [password]);

    return (
        <div className={styles.passwordStrengthDisplay}>
            <div className={styles.passwordStrengthSlider}>
                <div
                    className={styles.sliderFill}
                    style={{ width: `${strength}%`, backgroundColor: getStrengthColour(strength) }}
                ></div>
            </div>
            <div className={styles.strengthMessage}>{getPasswordStrengthMessage(password, lang)}</div>
        </div>
    );
};