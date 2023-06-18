import { QuizMakerService } from './quiz-maker.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizCategoryItem } from './interface/quiz-category-item.interface';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.scss'],
})
export class QuizMakerComponent implements OnInit {
  public categoryList: Observable<Array<QuizCategoryItem>>;

  constructor(private quizMakerService: QuizMakerService) {
    this.categoryList = this.quizMakerService.getQuizCategoryList();
  }

  ngOnInit() {}
}
