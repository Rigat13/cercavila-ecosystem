import React, { useState } from 'react';
import Login from './Login';
import UserProfile from './UserProfile';

const App: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);

    const handleLogin = (token: string) => {
        setToken(token);
        localStorage.setItem('token', token); // Optionally store it in local storage
    };

    return (
        <div>
            {token ? <UserProfile token={token} /> : <Login onLogin={handleLogin} />}
        </div>
    );
};

export default App;
