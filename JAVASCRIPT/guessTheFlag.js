const mainPageBox = document.querySelector(".main-page-box");
const gameBackground = document.querySelector(".game-background");

const url = `https://flagcdn.com/en/codes.json`;
let fetchedFLagData = {};
const gameStartTime = 3;

function fetchingFlagData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            fetchedFLagData = data;

            startGame(fetchedFLagData);
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
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

    function gameIsRunning() {
        let selectedFlag = selectFlag();
        let getOptionsArray = getOptions();

        getOptionsArray.push(selectedFlag.flagName);

        let randomOptions = shuffleOptions(getOptionsArray);

        // console.log(randomOptions);
        // console.log(tempObjForConditionChecking.ans);

        gameBackground.innerHTML = `
        <div class="flags-container">
            <div class="flag-box"><img src="https://flagcdn.com/${selectedFlag.flagCode}.svg"></div>
        </div>

        <div class="option-container">
            <div class="option">${randomOptions.A}</div>
            <div class="option">${randomOptions.B}</div>
            <div class="option">${randomOptions.C}</div>
            <div class="option">${randomOptions.D}</div>
        </div>
        
        <div class="game-timer">${score}</div>`;
    }

    gameIsRunning();

    function intervalFunction() {
        stopGameInterval = setInterval(() => {
            gameIsRunning();
            console.log(stopGameInterval);
        }, 5000);
    }

    intervalFunction();

    gameBackground.addEventListener("click", (e) => {
        if (e.target.classList.contains("option")) {
            if (e.target.textContent === tempObjForConditionChecking.ans) {
                score++;
                clearInterval(stopGameInterval);

                console.log(stopGameInterval);

                gameIsRunning();

                // intervalFunction();
            } else {
                clearInterval(stopGameInterval);
                console.log(e.target);
                gameBackground.innerHTML = "<div>wrong</div>";

                mainPageBox.classList.remove("hide");
                gameBackground.classList.add("hide");
            }
        }
    });
}

mainPageBox.addEventListener("click", (e) => {
    if (e.target.classList.contains("play-button")) {
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
                fetchingFlagData();
                clearInterval(startTimeInterval);
            }
            x--;
        }, 1000);
    }
});