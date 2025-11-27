"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

type GameType = {
    id: number;
    category_name: string;
    question_count: number;
    teacher_username: string;
}[]

export default function Game() {
  const [games, setGames] = useState<GameType | null>(null);

  useEffect(() => {
    async function getGames() {
      const response = await fetch("http://localhost:8080/backend/game.php", {
        method: 'GET',
      });
      const data: GameType = await response.json();
      setGames(data);
    }

    getGames();
  }, []);

  if (!games) return <p>Loading...</p>;

  return (
    <div>
      <ul>
        {games?.map((category) => (
          <li key={category.id}>
            <Link href={`/game/${category.id}`} key={category.id}>
              {category.category_name} - {category.teacher_username} ({category.question_count} questions)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}