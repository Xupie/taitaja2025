'use client'

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameClient from "./gameClient";

export default function GameId() {
    const { id } = useParams<{ id: string; }>();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function getData() {
            const response = await fetch(`/api/game?id=${id}`, {
                method: 'GET',
                credentials: 'include',
            });

            if (!response.ok) {
                //return router.push("/game");
            }
            const data = await response.json();

            setLoading(false);
            return data;
        }

        getData();
    }, [id, router]);

    //if (loading) return <p>Loading...</p>

    return (
        <main>
            <GameClient />
            <h1>Game ID: {id}</h1>
        </main>
    );
}