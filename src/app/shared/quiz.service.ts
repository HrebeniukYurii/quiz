import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, SecurityContext } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { QuizCategoryItem } from './interface/quiz-category-item.interface';
import { CATEGORY_LIST_URL, CREATE_QUIZ_URL } from './constants/api';
import { QuizType } from './enum/quiz-type.enum';
import { QuizQuestion } from './interface/quiz-question.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { QUIZ_RESULTS } from 'src/app/shared/constants/navigation';

type CategoryListResponse = {
  trivia_categories: Array<QuizCategoryItem>;
};

type QuizCreateResponse = {
  response_code: number;
  results: Array<QuizQuestion>;
};

export type QuizResults = {
  userAnswer: string;
  correctAnswer: string;
};

const DEFAULT_QUIZ_QUESTIONS_AMOUNT: number = 5;
const DEFAULT_QUIZ_TYPE: QuizType = QuizType.MULTIPLE;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public questionsList: BehaviorSubject<Array<QuizQuestion>> =
    new BehaviorSubject([] as Array<QuizQuestion>);
  public quizResults: Array<QuizResults> = [];
  private _cachedCategoryList: Array<QuizCategoryItem> | null = null;

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {}

  public getQuizCategoryList(): Observable<Array<QuizCategoryItem>> {
    if (this._cachedCategoryList) {
      return of(this._cachedCategoryList);
    }
    return this.http.get<CategoryListResponse>(CATEGORY_LIST_URL).pipe(
      map(
        (response: { trivia_categories: Array<QuizCategoryItem> }) =>
          response.trivia_categories
      ),
      tap(
        (response: Array<QuizCategoryItem>) =>
          (this._cachedCategoryList = response)
      )
    );
  }

  public createQuiz(categoryId: number, difficulty: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        category: categoryId,
        amount: DEFAULT_QUIZ_QUESTIONS_AMOUNT,
        difficulty,
        type: DEFAULT_QUIZ_TYPE,
      },
    });
    return this.http
      .get<QuizCreateResponse>(`${CREATE_QUIZ_URL}`, { params })
      .pipe(
        map((response) => {
          for (const item of response.results) {
            item.question =
              this.domSanitizer.sanitize(SecurityContext.HTML, item.question) ??
              '';
            const allAnswers = item.incorrect_answers.concat([
              item.correct_answer,
            ]);
            allAnswers.sort(() => Math.random() - 0.5);
            item.allAnswers = allAnswers.map(
              (curr) =>
                this.domSanitizer.sanitize(SecurityContext.HTML, curr) ?? ''
            );
          }
          return response;
        }),
        tap((response) => this.questionsList.next(response.results))
      );
  }

  public validateQuiz(answers: Array<string>, questins: Array<QuizQuestion>) {
    this.quizResults = [];
    for (let i = 0; i < answers.length; i++) {
      this.quizResults.push({
        userAnswer: answers[i],
        correctAnswer: questins[i].correct_answer,
      });
    }
    this.router.navigate([QUIZ_RESULTS]);
  }
}
