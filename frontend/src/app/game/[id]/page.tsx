'use client'

import { useParams, useRouter } from "next/navigation";

export default async function GameId({ params }: { params: { id: string } }) {
    const { id } = useParams();
    const router = useRouter()
    
    const response = await fetch(`/api/game?id=${id}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        return router.push("/game");
    }

    const data = await response.json();

    return (
        <main>
            <h1>Game ID: {id}</h1>
        </main>
    );
}