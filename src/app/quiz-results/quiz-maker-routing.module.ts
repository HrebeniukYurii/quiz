import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { QuizResultsComponent } from './quiz-results.component';

const routes: Array<Route> = [
  {
    path: '',
    pathMatch: 'full',
    component: QuizResultsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizResultsRoutingModule {}
