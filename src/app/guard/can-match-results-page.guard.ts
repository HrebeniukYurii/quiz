import { QuizService } from './../shared/quiz.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { QUIZ_MAKER } from '../shared/constants/navigation';

@Injectable({
  providedIn: 'root',
})
export class CanMatchResultsPage {
  constructor(private router: Router, private quizService: QuizService) {}

  canMatch() {
    if (this.quizService.quizResults.length) {
      return true;
    }
    return this.router.parseUrl(QUIZ_MAKER);
  }
}
