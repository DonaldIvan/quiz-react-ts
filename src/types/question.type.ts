export type Question = {
  category: string;
  correct_answer: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = 'easy',
  MEIDUM = 'medium',
  HARD = 'hard',
}

export type Answer = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
