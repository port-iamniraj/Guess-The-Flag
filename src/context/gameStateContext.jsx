import { createContext, useState } from "react";

export const GameStateContext = createContext();

export default function GameStateProvider({ children }) {
    const [startGame, setStartGame] = useState(false);
    const [gameType, setGameType] = useState("");

    return (
        <GameStateContext.Provider
            value={{
                startGame,
                setStartGame,
                gameType,
                setGameType,
            }}
        >
            {children}
        </GameStateContext.Provider>
    );
}