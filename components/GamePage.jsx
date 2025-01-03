import React, { useEffect, useState } from "react";

export default function GamePage() {
    const [countryData, setCountryData] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetch("https://flagcdn.com/en/codes.json")
            .then(res => res.json())
            .then((countryData) => {
                setCountryData(countryData);
            });
    }, []);

    let quiz = {};
    if (countryData) {
        const totolFlags = Object.keys(countryData).length - 1;
        const selectFlag = Math.round(Math.random() * totolFlags);
        const flagNameDataArray = Object.values(countryData).map(countryName => countryName);
        const options = [];
        const selectedCountry = {};

        // putting 3 random options in empty array
        for (let i = 0; i < 3; i++) {
            options.push(flagNameDataArray[Math.round(Math.random() * totolFlags)]);
        }

        // getting the country data from choosen index
        Object.entries(countryData).forEach(([countryCode, countryName], index) => {
            if (index === selectFlag) {
                selectedCountry.countryCode = countryCode;
                selectedCountry.countryName = countryName;

                // putting 4th option in array (the right one)
                options.push(countryName);
            }
        });

        // shuffling options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        const shuffledOptions = {
            A: options[0],
            B: options[1],
            C: options[2],
            D: options[3]
        };

        quiz.country = selectedCountry;
        quiz.options = shuffledOptions;
    }

    function handleAnswer(e) {
        console.dir(e.target);
        if (e.target.textContent === quiz.country.countryName) {
            e.target.classList.add("green");
            setScore((prevState) => prevState + 1);
        } else {
            e.target.classList.add("red");
        }
    }

    return countryData === null ? <div>Loading</div> : <div className="game-background">
        <div className="flags-container">
            <div className="flag-box">
                <img src={`https://flagcdn.com/${quiz.country.countryCode}.svg`} />
            </div>

            <div className="option-container">
                {Object.values(quiz.options).map((countryName, i) => {
                    return <div key={countryName} onClick={handleAnswer} className={`option`}>{countryName}</div>;
                })}
            </div>
        </div>
        <div className="game-score">{score}</div>
    </div>;
}