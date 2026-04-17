import React, { useEffect, useState } from "react";

export default function GameStartingPage({ setPlay }: { setPlay: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [gameStartingTimer, setGameStartingTimer] = useState(3);

    useEffect(() => {
        if (gameStartingTimer === 0) return;

        const timer = setTimeout(() => {
            setGameStartingTimer((prevState) => prevState - 1);
        }, 1000)

        return () => clearTimeout(timer);
    }, [gameStartingTimer]);

    useEffect(() => {
        if (gameStartingTimer === 0) {
            const timeout = setTimeout(() => {
                setPlay(true);
            }, 100);

            return () => clearTimeout(timeout);
        }
    }, [gameStartingTimer, setPlay]);


    return (
        <div className="game-background">
            <div className="timer-box">
                <div className="timer-text">Game Starts in...</div>
                <div className="timer">{gameStartingTimer}</div>
            </div>;
        </div>
    )
}