import React, { useEffect, useRef, useState } from "react";

import volumePNG from "../src/assets/volume.png";
import volumeMutePNG from "../src/assets/volume-mute.png";

export default function GamePage({ setStartGame, score, setScore, gameType }) {
    const [countryData, setCountryData] = useState(null);
    const [quiz, setQuiz] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(10);
    const [enableSound, setEnableSound] = useState(false);

    const rightAnsSound = useRef(new Audio("./SOUNDS/Correct-Answer.mp3"));
    const wrongAnsSound = useRef(new Audio("./SOUNDS/Wrong-Answer.mp3"));

    useEffect(() => {
        rightAnsSound.current.load();
        wrongAnsSound.current.load();
    }, []);

    function generateQuiz(countryData) {
        const totolFlags = Object.keys(countryData).length - 1;
        const selectFlagIndex = Math.round(Math.random() * totolFlags);
        const flagNameDataArray = Object.values(countryData);

        const selectedCountry = {
            countryCode: Object.keys(countryData)[selectFlagIndex],
            countryName: flagNameDataArray[selectFlagIndex]
        };

        const options = new Set();

        // putting 3 random options in Set
        while (options.size < 3) {
            const randomOption = flagNameDataArray[Math.round(Math.random() * totolFlags)];

            // Ensuring the right answer isn’t duplicated in the random options.
            if (randomOption !== selectedCountry.countryName) options.add(randomOption);
        }

        options.add(selectedCountry.countryName);

        // shuffling options
        const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

        return {
            country: selectedCountry,
            options: {
                A: shuffledOptions[0],
                B: shuffledOptions[1],
                C: shuffledOptions[2],
                D: shuffledOptions[3]
            }
        };
    };

    useEffect(() => {
        fetch("https://flagcdn.com/en/codes.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((countryData) => {
                setCountryData(countryData);
                setQuiz(generateQuiz(countryData));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (gameType === "time") {
        useEffect(() => {
            if (timer <= 0) {
                setTimeout(() => {
                    setStartGame(false);// End game if timer reaches 0
                }, 1000);
                return;
            }

            const stopTimer = setInterval(() => {
                setTimer((prevState) => prevState - 1);
            }, 1000);

            return () => {
                clearInterval(stopTimer); // Cleanup on unmount or timer reset
            };
        }, [timer, setStartGame]);
    }

    function handleAnswer(e) {
        const selectedAnswer = e.target.textContent;
        setSelectedOption(selectedAnswer);

        if (selectedAnswer === quiz.country.countryName) {
            if (enableSound) rightAnsSound.current.play();

            setTimeout(() => {
                setQuiz(generateQuiz(countryData));
                setScore((prevState) => prevState + 1);
                setSelectedOption(null);

                if (gameType === "time") setTimer(10); // Reseting the timer on correct answer
            }, 1000);
        } else {
            if (enableSound) wrongAnsSound.current.play();

            setTimeout(() => {
                setStartGame(false);
            }, 1000);
        }
    }

    if (loading) return <div>Loading...</div>;

    return <div className="game-background">
        <div className="flags-container">
            <div className="flag-box">
                <img src={`https://flagcdn.com/${quiz.country.countryCode}.svg`} alt="Country flag" />
            </div>

            {
                gameType === "time" ? <div className="game-timer">
                    <div className="timer-line" style={{ width: `${(timer / 10) * 100}%` }}></div>
                </div> : ""
            }

            <div className="option-container">
                {Object.values(quiz.options).map((countryName) => {
                    return <div
                        key={countryName}
                        onClick={handleAnswer}
                        className={`option 
                            ${selectedOption === countryName ? countryName === quiz.country.countryName ? "green" : "red" : ""}`}
                        role="button"
                        aria-label={countryName}
                    >
                        {countryName}
                    </div>;
                })}
            </div>
        </div>
        <div className="game-score">{score}</div>
        <div className="sound-box" onClick={() => setEnableSound(!enableSound)}>
            <img src={enableSound ? volumePNG : volumeMutePNG} alt="volume" />
        </div>
    </div>;
}