import { QuizService } from './../../shared/quiz.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuizQuestion } from 'src/app/shared/interface/quiz-question.interface';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.scss'],
})
export class QuizQuestionsComponent implements OnInit {
  @Input({ required: true }) questionsList!: Array<QuizQuestion>;
  public qustionsGroup: FormGroup = new FormGroup([]);
  public isSubmitButtonVisible: boolean = false;

  constructor(private quizService: QuizService) {}

  ngOnInit() {
    for (let i = 0; i < this.questionsList.length; i++) {
      this.qustionsGroup.addControl(
        `question${i}`,
        new FormControl(null, [Validators.required])
      );
    }
  }

  public markAsAnswer(controlIndex: number, answer: string) {
    this.qustionsGroup.get(`question${controlIndex}`)?.patchValue(answer);
  }

  public isSelectedAnswer(controlIndex: number, answer: string): boolean {
    return this.qustionsGroup.get(`question${controlIndex}`)?.value === answer;
  }

  public onSubmit(): void {
    if (this.qustionsGroup.valid) {
      this.quizService.validateQuiz(
        Object.values(this.qustionsGroup.value),
        this.questionsList
      );
    }
  }
}
