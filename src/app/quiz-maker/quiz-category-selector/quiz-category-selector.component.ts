import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizCategoryItem } from '../interface/quiz-category-item.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DifficultyLevel } from '../enum/difficulty.enum';
import { QuizMakerService } from '../quiz-maker.service';

@Component({
  selector: 'app-quiz-category-selector',
  templateUrl: './quiz-category-selector.component.html',
  styleUrls: ['./quiz-category-selector.component.scss'],
})
export class QuizCategorySelectorComponent implements OnInit {
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

  constructor(private quizMakerService: QuizMakerService) {}

  ngOnInit() {}

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
    this.quizMakerService
      .createQuiz(this.categoryField.value, this.difficultyField.value)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.isDataFetching = false;
        },
        error: (err) => (this.isDataFetching = false),
      });
  }
}
