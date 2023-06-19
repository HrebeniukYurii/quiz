import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizResultsComponent } from './quiz-results.component';
import { QuizResultsRoutingModule } from './quiz-maker-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialAppModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    QuizResultsRoutingModule,
    SharedModule,
    MaterialAppModule,
  ],
  declarations: [QuizResultsComponent],
})
export class QuizResultsModule {}
