import { useEffect, useReducer } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Loading from "./Loading";
import Error from "./Error";
import StartQuiz from "./StartQuiz";
import Question from "./Question";
import Timer from "./Timer";
import Button from "./Button";
import Result from "./Result";


const calcSum = (arr) => {
  return arr.reduce((acc, curr) => acc + curr, 0)
};

function App() {

  function reducer(state, action) {
    switch (action.type) {
      case 'dataIsLoading':
        return {
          ...state,
          status: 'loading',
          questions: []
        }
      case 'dataIsLoaded':
        return {
          ...state,
          status: 'loaded',
          questions: action.payload,
          totalPoints: calcSum(action.payload.map(q => q.points))
        }
      case 'startQuiz':
        console.log(state.questions.map(q => q.points));
        console.log(calcSum(state.questions.map(q => q.points)));
        return {
          ...state,
          status: 'active',
          currIndex: 0
        };
      case 'optionSelected':
        const question = state.questions.at(state.currIndex);
        return {
          ...state,
          userAnswer: action.payload,
          obtainedPoints:
            question.correctOption === action.payload ?
              (state.obtainedPoints + question.points) :
              (state.obtainedPoints)
        };
      case 'nextQuestion':
        return {
          ...state,
          currIndex: state.currIndex + 1,
          userAnswer: null
        }
      case 'finish':
        return {
          ...state,
          status: 'finish'
        }
      case 'error':
        return {
          ...state,
          status: 'error',
          error: action.payload.message,
          questions: []
        }

      case 'restart':
        return {
          ...initialState,
          status: 'active',
          currIndex: 0,
          totalPoints: state.totalPoints,
          questions: state.questions
        }
      case 'updateRemainedTime':
        if (state.remainedTime > 0) {
          return {
            ...state,
            remainedTime: state.remainedTime - 1
          }
        } else {
          return {
            ...state,
            remainedTime: 0,
            status: 'finish'
          }
        }
      default:
        throw new Error("unknown action");

    }
  }

  const initialState = {
    status: null,
    questions: [],
    error: null,
    currIndex: null,
    userAnswer: null,
    obtainedPoints: 0,
    totalPoints: 0,
    remainedTime: 30

  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(function () {
    dispatch({ type: 'dataIsLoading' })
    fetch("http://localhost:8000/questions")
      .then(res => {
        if (!res.ok) {
          throw new Error("something went wrong")
        }
        return res.json()
      })
      .then(data => {
        dispatch({ type: 'dataIsLoaded', payload: data })
      })
      .catch(err => {
        dispatch({ type: 'error', payload: err })
      })

  }, [])


  return (
    <div className="app">
      <Header />

      {state.status === 'loading' &&
        <Main className={`loading`}>
          <Loading />
        </Main>
      }
      {state.status === 'error' &&
        <Main classname={`error`}>
          <Error message={state.error} />
        </Main>}

      {state.status === 'loaded' &&
        <Main classname={`start-quiz`}>
          <StartQuiz
            dispatch={dispatch}
            numQuestion={state.questions.length} />
        </Main>}


      {state.status === 'active' &&
        <Main classname={`question`}>
          {/* {console.log(state)} */}
          <Question
            dispatch={dispatch}
            question={state.questions[state.currIndex]}
            userAnswer={state.userAnswer}
            numQuestions={state.questions.length}
            currIndex={state.currIndex}
            obtainedPoints={state.obtainedPoints}
            totalPoints={state.totalPoints} />
        </Main>}

      {state.status === 'finish' &&
        <Main classname={`result`}>
          <Result
            totalPoints={state.totalPoints}
            score={state.obtainedPoints} />
        </Main>
      }

      <Footer >
        {/* {console.log(state.status)} */}
        {state.status === 'active' &&
          <>
            <Timer remainedTime={state.remainedTime} dispatch={dispatch} />
            {

              state.currIndex < (state.questions.length - 1) ?
                (<Button
                  dispatch={dispatch}
                  action={{ type: 'nextQuestion' }}
                  disabled={state.userAnswer === null}
                >
                  Next
                </Button>) :
                (<Button
                  dispatch={dispatch}
                  disabled={state.userAnswer === null}
                  action={{ type: 'finish' }}
                >
                  Finish
                </Button>)
            }
          </>
        }
        {
          state.status === 'finish' &&
          <Button
            dispatch={dispatch}
            action={{ type: 'restart' }}
          >
            Restart quiz
          </Button>
        }
      </Footer>
    </div >
  );

}

export default App;
