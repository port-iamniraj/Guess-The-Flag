export default function Homepage() {
    return <div className="main-page-box">
        <div className="game-title">Guess The Flag</div>

        <div className="game-choice">
            <div className="streak-box game-choice-box">
                <img src="./IMAGES/fire.png" className="streak-play" alt="streak" />
                <div className="game-choice-text streak-play">Streak</div>
            </div>
            <div className="time-box game-choice-box">
                <img src="./IMAGES/time-bomb.png" className="time-play" alt="time" />
                <div className="game-choice-text time-play">Time</div>
            </div>
        </div>

        <div className="score-box">
            <div className="score-text">Your score</div>
            <div className="score"></div>
        </div>
    </div>;
}