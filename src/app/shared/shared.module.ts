import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchingButtonDirective } from './fetching-button.directive';
import { QuizAnswerButtonComponent } from './components/quiz-answer-button/quiz-answer-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [FetchingButtonDirective, QuizAnswerButtonComponent],
  exports: [FetchingButtonDirective, QuizAnswerButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
