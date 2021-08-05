import { MouseEvent } from 'react';

import { Answer } from 'App';

import { Wrapper, ButtonWrapper } from './QuetionCard.styles';
type Props = {
  question: string;
  answers: string[];
  callback?: (event: MouseEvent<HTMLButtonElement>) => void;
  userAnswer: Answer | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber + 1} / {totalQuestions}
      </p>
      <p>{question} </p>
      <div>
        {answers.map((answer, index) => (
          <ButtonWrapper
            key={index}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button disabled={!!userAnswer} value={answer} onClick={callback}>
              <span>{answer}</span>
            </button>
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
