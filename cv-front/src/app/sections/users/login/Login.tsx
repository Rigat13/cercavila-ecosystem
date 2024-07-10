import React, { useState, useEffect } from 'react';
import { LoginResponse } from './types';
import styles from './Login.module.scss';
import { dictionary } from "@/content";
import { URL_PREFIX } from "@/modules/users/infrastructure/configuration";
import {isUserNicknameValid, alreadyExistingNickname, NICKNAME_MIN_LENGTH, NICKNAME_MAX_LENGTH} from "@/modules/users/domain/user-attributes/UserNickname";
import {isUserPasswordValid, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "@/modules/users/domain/user-attributes/UserPassword";
import {useUsersContext } from "@/app/sections/users/UsersContext";

interface LoginProps {
    onLogin: (token: string, username: string) => void;
    lang: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [isNicknameValid, setIsNicknameValid] = useState<boolean>(false);
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false);
    const [nicknameExists, setNicknameExists] = useState<boolean>(true);

    const { userNicknames } = useUsersContext();

    let nicknameErrorMessage = "";
    let passwordErrorMessage = "";

    useEffect(() => {
        validateUsername(username);
        validatePassword(password);
    }, [username, password]);

    const validateUsername = (username: string) => {
        const valid = isUserNicknameValid(username);
        const exists = alreadyExistingNickname(username, userNicknames, "");
        setIsNicknameValid(valid);
        setNicknameExists(exists);

        nicknameErrorMessage = valid ? "" : dictionary[lang]?.userNicknameInvalid + NICKNAME_MIN_LENGTH + " - " + NICKNAME_MAX_LENGTH,
            nicknameErrorMessage = exists ? nicknameErrorMessage : dictionary[lang]?.userNotFoundError;
        setError(nicknameErrorMessage);
    };

    const validatePassword = (password: string) => {
        const valid = isUserPasswordValid(password);
        setIsPasswordValid(valid);

        passwordErrorMessage = valid ? "" : dictionary[lang]?.userPasswordInvalid + PASSWORD_MIN_LENGTH + " - " + PASSWORD_MAX_LENGTH;
        setError(passwordErrorMessage);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isNicknameValid || !isPasswordValid) { return; }

        try {
            const response = await fetch(URL_PREFIX + '/auth/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                if (response.status === 401) { setError(dictionary[lang]?.incorrectPasswordError); }
                else if (response.status === 404) { setError(dictionary[lang]?.userNotFoundError); }
                else { throw new Error('Login failed'); }
                return;
            }

            const data: LoginResponse = await response.json();
            onLogin(data.jwt, username);

            localStorage.setItem('token', data.jwt);
            localStorage.setItem('username', username);

        } catch (error) {
            console.error("Login error:", error);
            setError(dictionary[lang]?.loginError);
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h1 className={styles.loginTitle}>{dictionary[lang]?.loginTitle}</h1>
                <div>
                    <label>{dictionary[lang]?.userNickname}:<input type="text"  value={username} onChange={(e) => setUsername(e.target.value)}/></label>
                    {username && !isNicknameValid && (<div className={styles.errorMessage}>{dictionary[lang]?.userNicknameInvalid}</div>)}
                    {username && !nicknameExists && (<div className={styles.errorMessage}>{dictionary[lang]?.userNotFoundError}</div>)}
                </div>
                <div>
                    <label>{dictionary[lang]?.userPassword}:<input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/></label>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.buttonContainer}>
                    <button type="submit" className={styles.actionButton}
                            disabled={!isNicknameValid || !nicknameExists || !isPasswordValid}>
                        {dictionary[lang]?.loginButton}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
