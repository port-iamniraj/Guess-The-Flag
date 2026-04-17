import { useGameState } from "../context/gameStateContext";
import HomePage from "./HomePage";
import GamePlay from "./GamePlay";
import { useEffect } from "react";

export default function GameWrapper() {
    const { startGame } = useGameState();

    useEffect(() => {
        if (localStorage.getItem("score")) {
            localStorage.setItem("score", JSON.stringify({ streak: 0, time: 0 }));
        }
    }, []);

    return (
        <div className="main-page-box">
            {
                startGame ? <GamePlay /> : <HomePage />
            }
        </div>
    );
}