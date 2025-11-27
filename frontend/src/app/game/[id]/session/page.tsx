import GameClient from "../gameClient";

export default async function GameSession({ params, }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return (
        <div>
            <h1 className="text-right me-2">Game ID: {id}</h1>
            <GameClient id={id}/>
        </div>
    );
}