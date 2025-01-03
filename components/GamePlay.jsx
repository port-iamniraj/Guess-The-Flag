import React, { useState } from "react";

import GameStartingPage from "./GameStartingPage";
import GamePage from "./Gamepage";

export default function GamePlay() {
    const [play, setPlay] = useState(true);

    return play ? <GamePage /> : <GameStartingPage setPlay={setPlay} />;
}