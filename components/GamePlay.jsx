import React, { useState } from "react";

import GameStartingPage from "./GameStartingPage";
import GamePage from "./Gamepage";

export default function GamePlay({ setStartGame, score, setScore, gameType }) {
    const [play, setPlay] = useState(false);

    return play ?
        <GamePage
            setStartGame={setStartGame}
            score={score}
            setScore={setScore}
            gameType={gameType}
        />
        : <GameStartingPage
            setPlay={setPlay}
        />;
}