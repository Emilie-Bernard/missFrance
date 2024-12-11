'use client';

import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Ranking() {
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/get-user', {
                method: 'GET',
            });
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);
    return <div>
        <h1 className="text-2xl font-bold">Classement</h1>
        {users.map((user: User) => <div key={user.id}>{user.quiz} - {user.firstName} {user.lastName}</div>)}
    </div>;
}