"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryCard } from "@/components/card";
import Carousel from "@/components/carousel";
import { env } from "process";

type GameType = {
  id: number;
  category_name: string;
  question_count: number;
  teacher_username: string;
}[]

export default function Game() {
  const [games, setGames] = useState<GameType | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function getGames() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game.php?action=get_categories`, {
        method: 'GET',
      });
      const data: GameType = await response.json();
      setGames(data);
    }

    getGames();
  }, []);

  if (!games) return <p>Loading...</p>;

  return (
    <div className="mx-auto md:max-w-4/5">
      <Carousel images={
        [
          {
            id: "1",
            img: "/game/1.jpg",
            text: "Historia"
          },
          {
            id: "2",
            img: "/game/2.jpg",
            text: "Maantiede"
          },
          {
            id: "3",
            img: "/game/3.jpg",
            text: "Urheilu"
          },
          {
            id: "4",
            img: "/game/4.jpg",
            text: "Tiede"
          },
        ]
      } />
      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {games?.map((category) => (
          <div key={category.id} className="w-full text-center">
            <CategoryCard 
              bgClass="bg-secondary"
              onClick={() => router.push(`/game/${category.id}`)} 
              category={category.category_name} 
              creator={category.teacher_username} 
            >
            </CategoryCard>
          </div>
        ))}
      </div>

    </div>
  );
}