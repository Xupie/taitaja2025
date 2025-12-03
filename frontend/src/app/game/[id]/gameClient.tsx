'use client'
import { useEffect, useState } from "react";
import { GameCard } from "@/components/card";
import { useRouter } from "next/navigation";
import { env } from "process";

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
    correct_count: number;
}

type GameAnswer = {
    status: string;
    correct_count: number;
}

type GameLeaderboards = {
    username: string;
    correct_answers: number;
}[];

export default function GameClient({ id }: GameClientProps) {
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState<GameQuestionsType[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    const [leaderboards, setLeaderboards] = useState<GameLeaderboards>([]);

    const router = useRouter();

    async function sendAnswer(answer: string) {
        const response = await fetch(`${env.API_URL}/game.php`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ answer: answer, gameId: id }),
        });
        const data: GameAnswer = await response.json();

        // No session
        if (response.status === 401) {
            router.push("/game");
            return;
        }

        if (data.status === "Correct") {
            setCorrectCount(data.correct_count);
        }

        setCurrentIndex(prev => prev + 1);
    }

    useEffect(() => {
        if (!loading && questions.length && currentIndex >= questions.length) {
            async function getLeaderboards() {
                const response = await fetch(`${env.API_URL}/game_leaderboards.php?id=${id}`, {
                    method: 'GET',
                });
                const data: GameLeaderboards = await response.json();

                setLeaderboards(data);
            }
            getLeaderboards();
        }
    }, [loading, questions, currentIndex, id]);


    useEffect(() => {
        if (!id) return;

        async function getData() {
            const response = await fetch(`${env.API_URL}/game.php?action=get_questions&id=${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
            const data: GameDataType = await response.json();
            console.log(data);
            setQuestions(data.questions);
            setCurrentIndex(data.questionIndex);
            setCorrectCount(data.correct_count);
            setLoading(false);
        }

        getData();
    }, [id]);

    if (loading) return <p>Loading...</p>

    const currentQuestion = questions[currentIndex];

    // game ended
    if (!currentQuestion) {
        return (
            <div>
                <div className="text-center my-20 text-xl">
                    <p>Peli päättyi</p>
                    <p>Vastasit oikein {correctCount}/{questions.length} kysymykseen</p>
                </div>

                <div className="m-6 flex justify-center">
                    <div className="w-full max-w-4xl">
                        <h2 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
                            Leaderboards
                        </h2>
                        <div>
                            {leaderboards.length > 0 ? (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                    {leaderboards.map((user, index) => (
                                        <li
                                            key={index}
                                            className="bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center"
                                        >
                                            <span className="text-xl font-semibold text-gray-900">
                                                {user.username}
                                            </span>
                                            <span className="text-gray-600 mt-2">
                                                Oikein vastattu: {user.correct_answers}/{questions.length}
                                            </span>
                                            <span className="text-sm text-gray-400 mt-1">
                                                Sija #{index + 1}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-gray-500 text-lg">Loading leaderboards...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

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