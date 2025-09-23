
export default function Result({ totalPoints, score, highScore = 100 }) {

    const percentage = Math.round(score / totalPoints * 100);

    function getEmoji(percentage) {
        switch (true) {
            case percentage === 100:
                return "🎉";
            case percentage >= 80:
                return "😊";
            case percentage >= 50:
                return "😐";
            default:
                return "😢";
        }
    }


    return (
        <>
            <h4 className="btn score">
                <span>{getEmoji(percentage)}</span> You scored {score} out of {totalPoints} ({percentage}%)
            </h4>
            <p className="highscore">(Highscore: {highScore} points)</p>
        </>);
}