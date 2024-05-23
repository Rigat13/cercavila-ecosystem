import React, { useEffect, useState } from 'react';
import { User } from './types';

interface UserProfileProps {
    token: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ token }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost/auth/api/users', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data: User = await response.json();
                setUser(data);
            } else {
                console.error('Failed to fetch user data');
            }
        };

        fetchData();
    }, [token]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Welcome, {user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};

export default UserProfile;
