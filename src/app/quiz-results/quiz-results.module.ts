import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizResultsComponent } from './quiz-results.component';
import { QuizResultsRoutingModule } from './quiz-maker-routing.module';

@NgModule({
  imports: [CommonModule, QuizResultsRoutingModule],
  declarations: [QuizResultsComponent],
})
export class QuizResultsModule {}
