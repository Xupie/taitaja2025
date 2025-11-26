'use client'
import { useEffect, useState } from "react";
import { GameCard } from "@/components/card";


type GameClientProps = {
    id: string;
}

type GameQuestionsType = {
    question: string;
    option_a: string;
    option_b: string;
    option_d: string;
    option_c: string;
}

export default function GameClient({ id }: GameClientProps) {
    const [loading, setLoading] = useState(true);
    const [game, setGame] = useState<GameQuestionsType | null>(null);

    useEffect(() => {
        if (!id) return;

        async function getData() {
            const response = await fetch(`http://localhost:8080/backend/game.php?id=${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data: GameQuestionsType = await response.json();
            setGame(data);
            setLoading(false);
        }

        getData()
    }, [id]);

    async function sendAnswer(answer: string) {
        setLoading(true);

        const response = await fetch(`http://localhost:8080/backend/game.php?id=${id}`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(answer),
        });
        const data = await response.json();

        if (data['status'] == "Correct") {
            console.log("correct")
        }
        else {
            console.log("incorrect")
        }
        setLoading(false);
    }

    if (loading) return <p>Loading...</p>

    return (
        <main className="justify-center items-center">
            <div className="text-center mb-4">
                <p>Kysymys 0/10</p>
                <h1 className="text-3xl ">Kysymys</h1>
            </div>


            <div className="grid grid-cols-2 md:gap-4 w-full md:my-6 md:px-6">
                <GameCard bgClass="bg-game-blue" text={game?.option_a} onClick={() => sendAnswer("A")} />
                <GameCard bgClass="bg-game-green" text={game?.option_b} onClick={() => sendAnswer("B")} />
                <GameCard bgClass="bg-game-red" text={game?.option_c} onClick={() => sendAnswer("C")} />
                <GameCard bgClass="bg-game-magenta" text={game?.option_d} onClick={() => sendAnswer("D")} />
            </div>
        </main>
    );
}