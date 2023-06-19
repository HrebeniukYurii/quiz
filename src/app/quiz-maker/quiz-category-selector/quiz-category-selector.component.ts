import { Component, Input, OnDestroy } from '@angular/core';
import { Observable, Subscription, finalize } from 'rxjs';
import { QuizCategoryItem } from '../../shared/interface/quiz-category-item.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DifficultyLevel } from '../../shared/enum/difficulty.enum';
import { QuizService } from '../../shared/quiz.service';

@Component({
  selector: 'app-quiz-category-selector',
  templateUrl: './quiz-category-selector.component.html',
})
export class QuizCategorySelectorComponent implements OnDestroy {
  @Input({ required: true })
  categoryList!: Observable<Array<QuizCategoryItem>>;

  public categoryForm = new FormGroup({
    category: new FormControl(null, [Validators.required]),
    difficulty: new FormControl(null, [Validators.required]),
  });
  public difficulty: Array<DifficultyLevel> = [
    DifficultyLevel.EASY,
    DifficultyLevel.MEDIUM,
    DifficultyLevel.HARD,
  ];
  public isDataFetching: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(private quizService: QuizService) {}

  get categoryField(): FormControl {
    return this.categoryForm.get('category') as FormControl;
  }

  get difficultyField(): FormControl {
    return this.categoryForm.get('difficulty') as FormControl;
  }

  public onFormSubmit(): void {
    this.categoryForm.markAllAsTouched();
    if (this.categoryForm.invalid) {
      return;
    }
    this.isDataFetching = true;
    this.quizService.questionsList.next([]);
    this.subscription.add(
      this.quizService
        .createQuiz(this.categoryField.value, this.difficultyField.value)
        .pipe(finalize(() => (this.isDataFetching = false)))
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
