"use client"

import Button_Primary from "@/components/buttons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";

export default function GameDescription({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //TODO: get info from api
    const gameInfo = { name: "Game", description: "Description" };

    const startGame = async () => {
        setLoading(true);

        const res = await fetch(`http://localhost:8080/backend/game_session.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameId: id }),
        });

        const data = await res.json();
        setLoading(false);

        if (data.status === 'ok') {
            router.push(`/game/${id}/session`);
        } else {
            alert("Failed to start game: " + data.status);
        }
    };

    return (
        <main className="p-4 text-center">
            <h1 className="text-3xl font-bold">{gameInfo.name}</h1>
            <p className="my-4">{gameInfo.description}</p>

            <div className=" flex flex-col gap-1 w-1/4">
                <label className="text-left" htmlFor="name">Nimi</label>
                <input className="justify-center border-2 rounded-md p-1.5" placeholder="Nimi" id="name" type="text" />
            </div>

            <Link href={`/game/${id}/session`}>
                <Button_Primary onClick={startGame} text={loading ? "Odota..." : "Pelaa"} height="3rem" width="10rem" />
            </Link>
        </main>
    );
}