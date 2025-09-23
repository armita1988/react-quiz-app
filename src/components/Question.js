import ProgressBar from "../ProgressBar";
import Option from "./Option";
export default function Question({ question, dispatch, userAnswer,
    currIndex, numQuestions, obtainedPoints, totalPoints }) {

    return (<>
        <header className="progress">
            <ProgressBar
                isAnswered={userAnswer !== null}
                currIndex={currIndex}
                numQuestions={numQuestions} />
            <div className="progress-statics">
                <p>Question<strong>{currIndex + 1}</strong>/{numQuestions}</p>
                <p><strong>{obtainedPoints}</strong>/{totalPoints}</p>
            </div>
        </header>
        <h4 className="question-title">{question.question}</h4>
        <ul className="question-options ">
            {question.options.map((opt, index) =>
                <Option value={opt}
                    index={index}
                    key={index}
                    dispatch={dispatch}
                    userAnswer={userAnswer}
                    correctOption={question.correctOption} />
            )}
        </ul>


    </>);
}