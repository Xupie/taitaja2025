"use client"

import Button_Primary from "@/components/buttons";
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

        const username = (document.querySelector("input[name=username]") as HTMLInputElement).value;

        const response = await fetch(`http://localhost:8080/backend/game_session.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ id: id, username: username }),
        });

        const data = await response.json();
        console.log(data);
        setLoading(false);

        if (response.ok) {
            router.push(`/game/${id}/session`);
        } else {
            alert("Failed to start game: " + data.status);
        }
    };

    return (
        <div className="p-4 text-center">
            <h1 className="text-3xl font-bold">{gameInfo.name}</h1>
            <p className="my-4">{gameInfo.description}</p>

            <div className=" flex flex-col gap-1">
                <label className="text-left" htmlFor="name">Nimi</label>
                <input className="justify-center border-2 rounded-md p-1.5" name="username" placeholder="Nimi" id="username" type="text" />
            </div>

            <Button_Primary onClick={startGame} text={loading ? "Odota..." : "Pelaa"} height="3rem" width="10rem" />
        </div>
    );
}