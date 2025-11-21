'use client'

import Card from "@/components/card";

export default function GameClient() {

    return (
        <main>
            <p></p>
            <h1></h1>
            <div className="grid-cols-2">
                <div className="grid-rows-2">
                    <Card bgClass="bg-game-blue">
                        <h2>Hello world!</h2>
                    </Card>
                    <Card bgClass="bg-game-green">
                        <h2>Hello world!</h2>
                    </Card>
                </div>
                <div>
                    <Card bgClass="bg-game-red">
                        <h2>Hello world!</h2>
                    </Card>
                    <Card bgClass="bg-game-magenta">
                        <h2>Hello world!</h2>
                    </Card>
                </div>
            </div>
        </main>
    );
}