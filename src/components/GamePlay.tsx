import { useState } from "react";

import GameStartingPage from "./GameStartingPage";
import GamePage from "./GamePage";

export default function GamePlay() {
    const [play, setPlay] = useState(false);

    return play ? <GamePage /> : <GameStartingPage setPlay={setPlay} />;
}