import React from "react";

import "./Homepage.css";
import fire from "/assets/fire.png";
import timerBomb from "/assets/timer-bomb.png";

import gtfIcon from "/assets/gtf.png";

export default function HomePage({ setStartGame, score, setGameType }) {
    return <div className="homepage-wrapper">
        <div className="backdrop-bg">
            <div className="main-page-box">
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
                    <div className="score-text">Your High score</div>
                    <div className="score">{score}</div>
                </div>
            </div>;
        </div>
    </div>;
}