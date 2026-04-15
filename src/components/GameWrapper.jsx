import { useContext } from "react";
import GameStateProvider, { GameStateContext } from "../context/gameStateContext";
import HomePage from "./Homepage";
import GamePlay from "./GamePlay";

export default function GameWrapper() {
    const { startGame } = useContext(GameStateContext);
    localStorage.getItem("score") || localStorage.setItem("score", JSON.stringify({ streak: 0, time: 0 }));

    return (
        <div className="main-page-box">
            {
                !startGame ? <HomePage /> : <GamePlay />
            }
        </div>
    );
}