export default function Option({ dispatch, value, index, userAnswer, correctOption }) {
    const isAnswered = userAnswer !== null;
    return (
        <li className="option">
            <button className={`btn 
            ${userAnswer === index ? 'selectedOption' : ''} 
            ${isAnswered && (index === correctOption ? ' btn-disabled correctOption' : 'btn-disabled wrongOption')}`}
                onClick={() => dispatch({ type: 'optionSelected', payload: index })}
                disabled={isAnswered}>
                {value}
            </button>
        </li>
    );
}