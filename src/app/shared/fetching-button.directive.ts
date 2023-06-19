import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFetchingButton]',
})
export class FetchingButtonDirective implements AfterViewInit, OnChanges {
  @Input() isFetching?: boolean;
  private buttonLabel: string = '';

  constructor(private element: ElementRef<HTMLButtonElement>) {}

  ngAfterViewInit(): void {
    this.buttonLabel = this.element.nativeElement.innerText;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFetching'].firstChange) {
      return;
    }
    if (changes['isFetching'].currentValue === true) {
      this.element.nativeElement.setAttribute('disabled', 'true');
      this.element.nativeElement.innerText = 'Fetching...';
    } else {
      this.element.nativeElement.removeAttribute('disabled');
      this.element.nativeElement.innerText = this.buttonLabel;
    }
  }
}
