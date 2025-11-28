"use client"

import Button_Primary from "@/components/buttons";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

type GameDataType = {
    name: string;
    description: string | null;
}

export default function GameDescription({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(true);
    const [gameData, setGameData] = useState<GameDataType>();
    const router = useRouter();

    useEffect(() => {
        if (!id) return;

        async function getGameData() {
            const response = await fetch(`http://localhost:8080/backend/game_info.php?id=${id}`, {
                method: 'GET',
            });
            let data = await response.json();
            if (data.description == null) data.description = "Ei Kuvausta"
            setGameData(data);
            setLoading(false);
        }

        getGameData();
    }, [id]);

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
        setLoading(false);

        if (response.ok) {
            router.push(`/game/${id}/session`);
        } else {
            alert("Virhe: " + data.status);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center p-6 mt-10">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-primary mb-4">{loading ? "loading..." : gameData?.name}</h1>
                <p className="text-gray-600 text-center mb-6">{loading ? "loading..." : gameData?.description}</p>

                <div className="w-full flex flex-col gap-4 mb-6">
                    <label className="text-gray-700 font-semibold text-left" htmlFor="username">Nimi</label>
                    <input
                        className="border-2 border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary rounded-lg p-3 text-gray-700 transition-all duration-200 outline-none"
                        name="username"
                        placeholder="Nimi"
                        id="username"
                        type="text"
                    />
                </div>

                <Button_Primary
                    onClick={startGame}
                    text={loading ? "Odota..." : "Pelaa"}
                    height="3rem"
                    width="12rem"
                />
            </div>
        </div>
    );
}