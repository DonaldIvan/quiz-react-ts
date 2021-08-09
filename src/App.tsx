import { useState, MouseEvent } from 'react';

import QuestionCard from 'components/QuestionCard/QuetionCard';

import { fetchQuestion } from 'apis/Question';
import { GlobalStyle, Wrapper } from 'App.style';
import { Difficulty, QuestionState, Answer } from 'types/question.type';

const TOTAL_QUESTION = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnwers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuestion(TOTAL_QUESTION, Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnwers([]);
    setQuestionNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: MouseEvent<HTMLButtonElement>) => {
    if (gameOver) return;
    const answer = event.currentTarget.value;
    const correct = questions[questionNumber].correct_answer === answer;
    correct && setScore((prev) => prev + 1);
    const answerObject: Answer = {
      question: questions[questionNumber].question,
      answer,
      correct,
      correctAnswer: questions[questionNumber].correct_answer,
    };
    setUserAnwers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {(gameOver || userAnswers.length === TOTAL_QUESTION) && (
          <button className="start" onClick={startQuiz}>
            Start
          </button>
        )}

        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading questions...</p>}
        {!loading && !gameOver && (
          <QuestionCard
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            callback={checkAnswer}
            userAnswer={userAnswers[questionNumber] || undefined}
            questionNumber={questionNumber}
            totalQuestions={TOTAL_QUESTION}
          />
        )}
        {!gameOver &&
          !loading &&
          userAnswers.length === questionNumber + 1 &&
          questionNumber !== TOTAL_QUESTION - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};

export default App;
