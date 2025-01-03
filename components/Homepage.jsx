import React from "react";

import "./Homepage.css";
import fire from "../src/assets/fire.png";
import timerBomb from "../src/assets/timer-bomb.png";

export default function HomePage({ setStartGame }) {
    return <div className="main-page-box">
        <div className="game-title">Guess The Flag</div>

        <div className="game-choice">
            <div className="game-choice-box" onClick={() => setStartGame(true)}>
                <img src={fire} className="streak-play" alt="streak" />
                <div className="game-choice-text streak-play">Streak</div>
            </div>
            <div className="time-box game-choice-box">
                <img src={timerBomb} className="time-play" alt="time" />
                <div className="game-choice-text time-play">Time</div>
            </div>
        </div>

        <div className="score-box">
            <div className="score-text">Your score</div>
            <div className="score"></div>
        </div>
    </div>;
}