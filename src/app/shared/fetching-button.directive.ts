import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFetchingButton]',
})
export class FetchingButtonDirective implements OnChanges {
  @Input() isFetching?: boolean;

  constructor(private element: ElementRef<HTMLButtonElement>) {
    console.log('element: ', element);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isFetching'].currentValue === true) {
      this.element.nativeElement.setAttribute('disabled', 'true');
    } else {
      this.element.nativeElement.removeAttribute('disabled');
    }
  }
}
