import { useEffect, useRef, useState } from "react";

import volumePNG from "/assets/volume.png";
import volumeMutePNG from "/assets/volume-mute.png";
import { useGameState } from "../context/gameStateContext";

type CountryDataType = {
    [key: string]: string;
}

type QuizType = {
    country: {
        countryCode: string;
        countryName: string;
    };
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
}

type Score = {
    streak: number;
    time: number;
};

export default function GamePage() {
    const { setStartGame, gameType } = useGameState()
    const [score, setScore] = useState(0);
    const [countryData, setCountryData] = useState<CountryDataType | null>(null);
    const [quiz, setQuiz] = useState<QuizType | null>(null);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [timer, setTimer] = useState(10);
    const [enableSound, setEnableSound] = useState(false);

    const rightAnsSound = useRef<HTMLAudioElement>(new Audio("./media/Correct-Answer.mp3"));
    const wrongAnsSound = useRef<HTMLAudioElement>(new Audio("./media/Wrong-Answer.mp3"));

    useEffect(() => {
        rightAnsSound.current.load();
        wrongAnsSound.current.load();
    }, []);

    function generateQuiz(countryData: CountryDataType): QuizType {
        const totalFlags = Object.keys(countryData).length - 1;
        const selectFlagIndex = Math.round(Math.random() * totalFlags);
        const flagNameDataArray = Object.values(countryData);

        const selectedCountry = {
            countryCode: Object.keys(countryData)[selectFlagIndex]!,
            countryName: flagNameDataArray[selectFlagIndex]!
        };

        const options = new Set<string>();

        // putting 3 random options in Set
        while (options.size < 3) {
            const randomOption = flagNameDataArray[Math.round(Math.random() * totalFlags)]!;

            // Ensuring the right answer isn’t duplicated in the random options.
            if (randomOption !== selectedCountry.countryName) options.add(randomOption);
        }

        options.add(selectedCountry.countryName);

        // shuffling options
        const shuffledOptions = Array.from(options).sort(() => Math.random() - 0.5);

        return {
            country: selectedCountry,
            options: {
                A: shuffledOptions[0]!,
                B: shuffledOptions[1]!,
                C: shuffledOptions[2]!,
                D: shuffledOptions[3]!
            }
        };
    };

    useEffect(() => {
        fetch("https://flagcdn.com/en/codes.json")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then((countryData: CountryDataType) => {
                setCountryData(countryData);
                setQuiz(generateQuiz(countryData));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (gameType !== "time") return;

        if (timer <= 0) {
            setTimeout(() => {
                setStartGame(false);// End game if timer reaches 0
            }, 1000);
            return;
        }

        const stopTimer = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        return () => {
            clearInterval(stopTimer);
        };
    }, [timer, gameType, setStartGame]);

    function handleAnswer(e: React.MouseEvent<HTMLDivElement>) {
        if (!quiz || !countryData) return;

        const selectedAnswer = e.currentTarget.textContent!;
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

            const prevStoredScore = localStorage.getItem("score")
            const prevScore: Score = prevStoredScore ? JSON.parse(prevStoredScore) : { streak: 0, time: 0 };

            if (gameType === "streak" && prevScore.streak < score) {
                localStorage.setItem("score", JSON.stringify({ ...prevScore, streak: score }));
            }
            if (gameType === "time" && prevScore.time < score) {
                localStorage.setItem("score", JSON.stringify({ ...prevScore, time: score }));
            }

            setTimeout(() => {
                setStartGame(false);
            }, 1000);
        }
    }

    if (!quiz || !countryData || loading) return <div>Loading...</div>;

    return (
        <div className="game-background">
            <div className="flags-container">
                <div className="flag-box">
                    <img src={`https://flagcdn.com/${quiz.country.countryCode}.svg`} alt="Country flag" />
                </div>

                {
                    gameType === "time" &&
                    <div className="game-timer">
                        <div className="timer-line" style={{ width: `${(timer / 10) * 100}%` }}></div>
                    </div>
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
            <div className="game-content">
                <div className="sound-box" onClick={() => setEnableSound(!enableSound)}>
                    <img src={enableSound ? volumePNG : volumeMutePNG} alt="volume" />
                </div>
                <div className="game-score">{score}</div>
            </div>
        </div>
    );
}