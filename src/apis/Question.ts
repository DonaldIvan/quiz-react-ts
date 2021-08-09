import { http } from './ApiClient';
import { shuffleArray } from 'utils/question';

import { Question, Difficulty, QuestionState } from 'types/question.type';

type GetQuestionResponse = {
  response_code: number;
  results: Question[];
};

export const fetchQuestion = async (
  amount: number,
  difficulty: Difficulty,
): Promise<QuestionState[]> => {
  const params = {
    amount,
    difficulty,
    type: 'multiple',
  };
  const { data } = await http.get<GetQuestionResponse>('', { params });
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};
