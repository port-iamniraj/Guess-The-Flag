import React, { useState } from "react";

export default function GameStartingPage({ setPlay }) {
    const [gameStartingTimer, setGameStartingTimer] = useState(3);

    const stopTimer = setTimeout(() => {
        setGameStartingTimer((prevState) => prevState - 1);
    }, 1000);

    if (gameStartingTimer === 0) {
        clearTimeout(stopTimer);

        setTimeout(() => {
            setPlay(true);
        }, 100);
    }


    return <div className="game-background">
        <div className="timer-box">
            <div className="timer-text">Game Starts in...</div>
            <div className="timer">{gameStartingTimer}</div>
        </div>;
    </div>;
}