import { useContext } from "react";

import fire from "/assets/fire.png";
import timerBomb from "/assets/timer-bomb.png";

import gtfIcon from "/assets/gtf.png";
import { useGameState } from "../context/gameStateContext";

type Score = {
    streak: number;
    time: number;
};

export default function HomePage() {
    const { setStartGame, setGameType } = useGameState();

    // # Simple
    const storedScore = localStorage.getItem("score");
    const score: Score = storedScore
        ? JSON.parse(storedScore)
        : { streak: 0, time: 0 };


    // # Better way to handle potential JSON parsing errors
    // let score: Score;
    // try {
    //     const storedScore = localStorage.getItem("score");
    //     score = storedScore
    //         ? JSON.parse(storedScore)
    //         : { streak: 0, time: 0 };
    // } catch {
    //     score = { streak: 0, time: 0 };
    // }

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