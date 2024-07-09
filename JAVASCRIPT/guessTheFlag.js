const mainPageBox = document.querySelector(".main-page-box");
const gameBackground = document.querySelector(".game-background");
const score = document.querySelector(".score");

const rightAnsSound = new Audio();
rightAnsSound.src = "/SOUNDS/Correct-Answer.mp3";
const wrongAnsSound = new Audio();
wrongAnsSound.src = "/SOUNDS/Wrong-Answer.mp3";
const countdown = new Audio();
countdown.src = "/SOUNDS/countdown.mp3";

const url = `https://flagcdn.com/en/codes.json`;
let fetchedFLagData = {};
let timerActivate = false;
const gameStartTime = 3;

async function fetchingFlagData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        fetchedFLagData = await response.json();
        startGame(fetchedFLagData);

    } catch (error) {
        console.error('Error loading JSON:', error);
    }

    // fetch(url)
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok ' + response.statusText);
    //         }
    //         return response.json();
    //     })
    //     .then(data => {
    //         fetchedFLagData = data;

    //         startGame(fetchedFLagData);
    //     })
    //     .catch(error => {
    //         console.error('Error loading JSON:', error);
    //     });
}

function startGame(data) {
    const totalFlags = 305;
    let score = 0;
    const flagNameDataArray = [];
    const tempObjForConditionChecking = {};

    for (let flagName in data) {
        flagNameDataArray.push(data[flagName]);
    }

    function selectFlag() {
        let selectIndex = Math.round(Math.random() * totalFlags);

        let index = 0;

        for (let flag in data) {
            // console.log(index, flag, data[flag]);
            if (index === selectIndex) {
                tempObjForConditionChecking.ans = data[flag];

                return { flagCode: flag, flagName: data[flag] };
            }
            index++;
        }
    }

    function getOptions() {
        let chooseOptionsArray = [];

        for (i = 0; i < 3; i++) {
            chooseOptionsArray.push(flagNameDataArray[Math.round(Math.random() * totalFlags)]);
        }

        return chooseOptionsArray;
    }

    function shuffleOptions(options) {
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }

        let shuffledOptions = {
            A: options[0],
            B: options[1],
            C: options[2],
            D: options[3]
        };

        return shuffledOptions;
    }

    const flagsContainer = document.createElement("div");
    flagsContainer.classList.add("flags-container");

    const flagBox = document.createElement("div");
    flagBox.classList.add("flag-box");

    const flagSVG = document.createElement("img");

    flagBox.append(flagSVG);
    flagsContainer.append(flagBox);

    const optionContainer = document.createElement("div");
    optionContainer.classList.add("option-container");

    let option = {};
    for (let i = 0; i <= 3; i++) {
        option[i] = document.createElement("div");
        option[i].classList.add("option");
    }

    const gameScore = document.createElement("div");
    gameScore.classList.add("game-score");

    optionContainer.append(option[0], option[1], option[2], option[3]);
    gameBackground.append(flagsContainer, optionContainer, gameScore);

    function gameIsRunning() {
        let selectedFlag = selectFlag();
        let getOptionsArray = getOptions();

        getOptionsArray.push(selectedFlag.flagName);

        let randomOptions = shuffleOptions(getOptionsArray);

        // console.log(randomOptions);
        // console.log(tempObjForConditionChecking.ans);

        for (let opt in option) {
            option[opt].classList.remove("green");
        }

        flagSVG.src = `https://flagcdn.com/${selectedFlag.flagCode}.svg`;

        option[0].textContent = randomOptions.A;
        option[1].textContent = randomOptions.B;
        option[2].textContent = randomOptions.C;
        option[3].textContent = randomOptions.D;

        gameScore.textContent = score;

        // gameBackground.innerHTML = `
        // <div class="flags-container">
        //     <div class="flag-box"><img src="https://flagcdn.com/${selectedFlag.flagCode}.svg"></div>
        // </div>

        // <div class="option-container">
        //     <div class="option">${randomOptions.A}</div>
        //     <div class="option">${randomOptions.B}</div>
        //     <div class="option">${randomOptions.C}</div>
        //     <div class="option">${randomOptions.D}</div>
        // </div>

        // <div class="game-timer">${score}</div>`;
    }

    let gameTimerFunctionInterval;
    let stopGameInterval;

    if (timerActivate) {
        const gameTimer = document.createElement("div");
        gameTimer.classList.add("game-timer");
        gameBackground.append(gameTimer);

        function gameTimerFunction() {
            let gameTimerCount = 10;
            countdown.play();
            gameTimerFunctionInterval = setInterval(() => {
                gameTimer.textContent = gameTimerCount--;
                if (gameTimerCount == 0) {
                    location.reload();
                }
            }, 1000);
        }

        function intervalFunction() {
            stopGameInterval = setInterval(() => {
                gameIsRunning();
                if (timerActivate) {
                    gameTimerFunction();
                }
            }, 10000);
        }

        gameTimerFunction();
        intervalFunction();
    }

    gameBackground.addEventListener("click", (e) => {
        if (e.target.classList.contains("option")) {
            if (e.target.textContent != tempObjForConditionChecking.ans) {
                wrongAnsSound.play();

                clearInterval(stopGameInterval);
                e.target.classList.add("red");

                setTimeout(() => {
                    location.reload();
                }, 1000);

                // mainPageBox.classList.remove("hide");
                // gameBackground.classList.add("hide");
            } else {
                rightAnsSound.play();

                score++;
                localStorage.setItem("score", score);

                if (timerActivate) {
                    countdown.pause();
                    countdown.currentTime = 0;
                    clearInterval(stopGameInterval);
                    clearInterval(gameTimerFunctionInterval);
                }

                e.target.classList.add("green");

                setTimeout(() => {
                    gameIsRunning();
                }, 1000);

                if (timerActivate) {
                    gameTimerFunction();
                    intervalFunction();
                }
            }
        }
    });

    gameIsRunning();
}

score.textContent = localStorage.getItem("score") || 0;

mainPageBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("streak-play")) {
        mainPageBox.classList.add("hide");
        gameBackground.classList.remove("hide");

        let x = 3;
        startTimeInterval = setInterval(() => {
            if (x >= 0) {
                gameBackground.innerHTML = `        
                    <div class="timer-box">
                        <div class="timer-text">Game Starts in</div>
                        <div class="timer">${x}</div>
                    </div>`;
            } else {
                gameBackground.innerHTML = "";
                fetchingFlagData();
                clearInterval(startTimeInterval);
            }
            x--;
        }, 1000);
    }
    else if (e.target.classList.contains("time-play")) {
        timerActivate = true;
        mainPageBox.classList.add("hide");
        gameBackground.classList.remove("hide");

        let x = 3;
        startTimeInterval = setInterval(() => {
            if (x >= 0) {
                gameBackground.innerHTML = `        
                    <div class="timer-box">
                        <div class="timer-text">Game Starts in</div>
                        <div class="timer">${x}</div>
                    </div>`;
            } else {
                gameBackground.innerHTML = "";
                fetchingFlagData();
                clearInterval(startTimeInterval);
            }
            x--;
        }, 1000);
    }
});