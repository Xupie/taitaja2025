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

type GameDataType = {
    questions: GameQuestionsType[];
    questionIndex: number;
}

export default function GameClient({ id }: GameClientProps) {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<GameQuestionsType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    async function sendAnswer(answer: string) {
        const response = await fetch(`http://localhost:8080/backend/game.php`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer: answer, gameId: id }),
        });
        const data = await response.json();

        if (data['status'] == "Correct") console.log("correct");
        else console.log("incorrect");

        setCurrentIndex(prev => prev + 1);
    }

    useEffect(() => {
        if (!id) return;

        async function getData() {
            const response = await fetch(`http://localhost:8080/backend/game.php?id=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data: GameDataType = await response.json();
            console.log(data);
            setQuestions(data.questions);
            setCurrentIndex(data.questionIndex);
            setLoading(false);
        }

        getData();
    }, [id]);

    if (loading) return <p>Loading...</p>

    const currentQuestion = questions[currentIndex];
    if (!currentQuestion) return <p>Peli päättyi</p>

    return (
        <main className="justify-center items-center">
            <div className="text-center mb-4">
                <p>Kysymys {currentIndex + 1}/{questions.length}</p>
                <h1 className="text-3xl">{currentQuestion.question}</h1>
            </div>

            <div className="grid grid-cols-2 md:gap-4 w-full md:my-6 md:px-6">
                <GameCard bgClass="bg-game-blue" text={currentQuestion.option_a} onClick={() => sendAnswer("A")} />
                <GameCard bgClass="bg-game-green" text={currentQuestion.option_b} onClick={() => sendAnswer("B")} />
                <GameCard bgClass="bg-game-red" text={currentQuestion.option_c} onClick={() => sendAnswer("C")} />
                <GameCard bgClass="bg-game-magenta" text={currentQuestion.option_d} onClick={() => sendAnswer("D")} />
            </div>
        </main>
    );
}