export default function ProgressBar({ numQuestions, currIndex, isAnswered }) {
    console.log(isAnswered)
    return (
        <progress className="progress-bar" max={numQuestions} value={isAnswered ? currIndex + 1 : currIndex} />
    );
}