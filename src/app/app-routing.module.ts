import { NgModule, inject } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CanMatchResultsPage } from './guard/can-match-results-page.guard';

const routes: Array<Route> = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'quiz-maker',
  },
  {
    path: 'quiz-maker',
    loadChildren: () =>
      import('./quiz-maker/quiz-maker.module').then((m) => m.QuizMakerModule),
  },
  {
    path: 'quiz-results',
    loadChildren: () =>
      import('./quiz-results/quiz-results.module').then(
        (m) => m.QuizResultsModule
      ),
    canMatch: [() => inject(CanMatchResultsPage).canMatch()],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
