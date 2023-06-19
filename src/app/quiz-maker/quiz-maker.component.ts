import { QuizService } from '../shared/quiz.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { QuizCategoryItem } from '../shared/interface/quiz-category-item.interface';
import { QuizQuestion } from '../shared/interface/quiz-question.interface';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
})
export class QuizMakerComponent implements OnInit, OnDestroy {
  public categoryList: Observable<Array<QuizCategoryItem>>;
  public questions: Array<QuizQuestion> = [];
  private subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {
    this.categoryList = this.quizService.getQuizCategoryList();
  }

  ngOnInit() {
    this.subscription.add(
      this.quizService.questionsList.subscribe({
        next: (questions) => (this.questions = questions),
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
