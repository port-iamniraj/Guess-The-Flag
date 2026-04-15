import React, { useState } from "react";

import "./style.css";
import GameWrapper from "./components/GameWrapper";
import GameStateProvider from "./context/gameStateContext";

export default function App() {
    return (
        <GameStateProvider>
            <div className="page-wrapper">
                <div className="backdrop-bg">
                    <GameWrapper />
                </div>
            </div>
        </GameStateProvider>
    );
}