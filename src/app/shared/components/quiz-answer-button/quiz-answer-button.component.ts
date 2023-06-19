import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-quiz-answer-button',
  templateUrl: './quiz-answer-button.component.html',
  styleUrls: ['./quiz-answer-button.component.scss'],
})
export class QuizAnswerButtonComponent implements OnInit {
  @Input() isDisabled: boolean = false;
  @Input() isSelectedAnswer: boolean = false;
  @Input() answerText!: string;
  @Input() classNames: string = '';
  @Output() clickEvent: EventEmitter<string> = new EventEmitter();

  ngOnInit() {
    this.classNames = 'quiz-answer-button ' + this.classNames;
  }
}
