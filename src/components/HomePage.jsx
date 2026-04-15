import React, { useContext } from "react";

import fire from "/assets/fire.png";
import timerBomb from "/assets/timer-bomb.png";

import gtfIcon from "/assets/gtf.png";
import { GameStateContext } from "../context/gameStateContext";

export default function HomePage() {
    const { setStartGame, setGameType } = useContext(GameStateContext);
    const score = localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : { streak: 0, time: 0 };

    return (
        <div className="homepage-container">
            <div className="game-title">
                <img src={gtfIcon} alt="Guess The Flag" />
            </div>

            <div className="game-choice">
                <div
                    className="game-choice-box"
                    onClick={() => {
                        setStartGame(true);
                        setGameType("streak");
                    }}
                >
                    <img src={fire} className="streak-play" alt="streak" />
                    <div className="game-choice-text streak-play">Streak</div>
                </div>
                <div
                    className="game-choice-box"
                    onClick={() => {
                        setStartGame(true);
                        setGameType("time");
                    }}
                >
                    <img src={timerBomb} className="time-play" alt="time" />
                    <div className="game-choice-text time-play">Time</div>
                </div>
            </div>

            <div className="score-box">
                <div>High score - </div>
                <div className="score">
                    <p>Streak : {score.streak}</p>
                    <p>Time : {score.time}</p>
                </div>
            </div>
        </div>
    );
}