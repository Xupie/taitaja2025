import GameClient from "./gameClient";

export async function generateStaticParams() {
    const res = await fetch("http://localhost:8080/backend/game.php");
    const categories = await res.json();

    return categories.map((category: any) => ({
        id: category.id.toString(),
    }));
}

export default async function GameId({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <main>
            <h1 className="text-right me-2">Game ID: {id}</h1>
            <GameClient id={id} />
        </main>
    );
}