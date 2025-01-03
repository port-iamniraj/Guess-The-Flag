import React, { useState } from "react";

import Homepage from "../components/HomePage";
import GamePlay from "../components/GamePlay";

export default function App() {
    const [startGame, setStartGame] = useState(true);

    return startGame ? <GamePlay /> : <Homepage setStartGame={setStartGame} />;
}