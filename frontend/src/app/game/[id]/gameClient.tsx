'use client'
import { useEffect, useState } from "react";
import Card, { GameCard } from "@/components/card";


type GameClientProps = {
    id: string;
}

export default function GameClient({ id }: GameClientProps) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function getData() {
            const response = await fetch(`/api/game?id=${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await response.json();

            setLoading(false);
            return data;
        }

        getData();
    }, [id]);

    //if (loading) return <p>Loading...</p>

    return (
        <main className="justify-center items-center">
            <div className="text-center mb-4">
                <p>Kysymys 0/10</p>
                <h1 className="text-3xl ">Kysymys</h1>
            </div>

            
            <div className="grid grid-cols-2 md:gap-4 w-full md:my-6 md:px-6">
                <GameCard bgClass="bg-game-blue" text="Card 1" onClick={() => console.log("1")} />
                <GameCard bgClass="bg-game-green" text="Card 2" onClick={() => console.log("2")} />
                <GameCard bgClass="bg-game-red" text="Card 3" onClick={() => console.log("3")} />
                <GameCard bgClass="bg-game-magenta" text="Card 4" onClick={() => console.log("4")} />
            </div>
        </main>
    );
}