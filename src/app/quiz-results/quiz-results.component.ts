import { Observable } from 'rxjs';
import { QuizService } from './../shared/quiz.service';
import { Component, OnInit } from '@angular/core';
import { QuizQuestion } from '../shared/interface/quiz-question.interface';
import { Router } from '@angular/router';
import { QUIZ_MAKER } from '../shared/constants/navigation';

type TotalScoreClass =
  | 'quiz-score'
  | 'bad-score'
  | 'medium-score'
  | 'excelent-score';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss'],
})
export class QuizResultsComponent implements OnInit {
  public questionsList: Observable<Array<QuizQuestion>>;
  public correctAnswersAmount: number = 0;
  public totalQuizAnswers: number = 0;
  public totalScoreClasses: Record<TotalScoreClass, boolean> | null = null;

  constructor(private quizService: QuizService, private router: Router) {
    this.questionsList = this.quizService.questionsList.asObservable();
  }

  ngOnInit() {
    this.correctAnswersAmount = this.quizService.quizResults.filter(
      (curr) => curr.correctAnswer === curr.userAnswer
    ).length;
    this.totalQuizAnswers = this.quizService.quizResults.length;
    this.totalScoreClasses = {
      'quiz-score': true,
      'bad-score': this.correctAnswersAmount <= 1,
      'medium-score':
        this.correctAnswersAmount > 1 && this.correctAnswersAmount < 4,
      'excelent-score': this.correctAnswersAmount >= 4,
    };
  }

  public getAnswerButtonClasses(
    answerText: string,
    questionIndex: number
  ): string {
    if (
      this.quizService.quizResults[questionIndex].correctAnswer === answerText
    ) {
      return 'quiz-button-right-answer';
    }
    if (this.quizService.quizResults[questionIndex].userAnswer === answerText) {
      return 'quiz-button-wrong-answer';
    }
    return '';
  }

  public recreateQuiz() {
    this.quizService.questionsList.next([]);
    this.router.navigate([QUIZ_MAKER]);
  }
}
