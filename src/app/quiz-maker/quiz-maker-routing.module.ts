import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuizMakerComponent } from './quiz-maker.component';

const routes: Array<Route> = [
  {
    path: '',
    pathMatch: 'full',
    component: QuizMakerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizMakerRoutingModule {}
