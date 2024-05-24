import React, { useState } from 'react';
import { LoginResponse } from './types';
import styles from './Login.module.scss';
import {dictionary} from "@/content";
import {URL_PREFIX} from "@/modules/users/infrastructure/configuration"; // Import the SCSS module

interface LoginProps {
    onLogin: (token: string, username: string) => void;
    lang: string;
}

const Login: React.FC<LoginProps> = ({ onLogin, lang }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(URL_PREFIX + '/auth/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data: LoginResponse = await response.json();
            onLogin(data.jwt, username);  // Pass the token and username to the parent component

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
                    <label>
                        {dictionary[lang]?.userNickname}:
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        {dictionary[lang]?.userPassword}:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                {error && <div className={styles.errorMessage}>{error}</div>}
                <div className={styles.buttonContainer}>
                    <button type="submit">{dictionary[lang]?.loginButton}:</button>
                </div>
            </form>
        </div>
    );
};

export default Login;
