import React, { useState } from "react";

import Homepage from "../components/HomePage";
import GamePlay from "../components/GamePlay";

export default function App() {
    const [startGame, setStartGame] = useState(false);
    const [score, setScore] = useState(0);
    const [gameType, setGameType] = useState("");

    return startGame ?
        <GamePlay
            setStartGame={setStartGame}
            score={score}
            setScore={setScore}
            gameType={gameType}
        />
        : <Homepage
            setStartGame={setStartGame}
            score={score}
            setGameType={setGameType}
        />;
}