import { DifficultyLevel } from '../enum/difficulty.enum';
import { QuizType } from '../enum/quiz-type.enum';

export interface QuizQuestion {
  category: string;
  correct_answer: string;
  difficulty: DifficultyLevel;
  incorrect_answers: Array<string>;
  allAnswers: Array<string>;
  question: string;
  type: QuizType;
}
