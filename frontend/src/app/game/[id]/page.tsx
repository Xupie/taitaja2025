import GameClient from "./gameClient";

export async function generateStaticParams() {
  return []
}

export default async function GameId({ params, }: {params: Promise<{ id: string}>}) {
    const { id } = await params
    return (
        <main>
            <h1 className="text-right me-2">Game ID: {id}</h1>
            <GameClient id={id} />
        </main>
    );
}