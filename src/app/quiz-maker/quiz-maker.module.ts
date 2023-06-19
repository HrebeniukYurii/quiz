import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizMakerComponent } from './quiz-maker.component';
import { QuizMakerRoutingModule } from './quiz-maker-routing.module';
import { QuizCategorySelectorComponent } from './quiz-category-selector/quiz-category-selector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialAppModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';

@NgModule({
  imports: [
    CommonModule,
    QuizMakerRoutingModule,
    ReactiveFormsModule,
    MaterialAppModule,
    SharedModule,
  ],
  declarations: [
    QuizMakerComponent,
    QuizCategorySelectorComponent,
    QuizQuestionsComponent,
  ],
})
export class QuizMakerModule {}
