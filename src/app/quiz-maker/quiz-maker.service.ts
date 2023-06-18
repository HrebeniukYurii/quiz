import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { QuizCategoryItem } from './interface/quiz-category-item.interface';
import { CATEGORY_LIST_URL, CREATE_QUIZ_URL } from '../constants/api';

type CategoryListResponse = {
  trivia_categories: Array<QuizCategoryItem>;
};

const DEFAULT_QUIZ_QUESTIONS_AMOUNT: number = 5;
const DEFAULT_QUIZ_TYPE: 'multiple' | 'boolean' = 'boolean';

@Injectable({
  providedIn: 'root',
})
export class QuizMakerService {
  private _cachedCategoryList: Array<QuizCategoryItem> | null = null;

  constructor(private http: HttpClient) {}

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
    return this.http.get(`${CREATE_QUIZ_URL}`, { params });
  }
}
