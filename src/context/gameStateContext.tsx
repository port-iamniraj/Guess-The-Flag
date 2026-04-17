import { createContext, useContext, useState } from "react";

type GameStateContextType = {
    startGame: boolean;
    setStartGame: React.Dispatch<React.SetStateAction<boolean>>; // (value: boolean | ((prev: boolean) => boolean)) => void
    gameType: string;
    setGameType: React.Dispatch<React.SetStateAction<string>>; // (value: string | ((prev: string) => string)) => void
}

export const GameStateContext = createContext<GameStateContextType | undefined>(undefined);

export function useGameState() {
    const context = useContext(GameStateContext);

    if (!context) {
        throw new Error("useGameState must be used within GameStateProvider");
    }

    return context;
}

export default function GameStateProvider({ children }: { children: React.ReactNode }) {
    const [startGame, setStartGame] = useState<boolean>(false);
    const [gameType, setGameType] = useState<string>("");

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