import { DomSanitizer } from '@angular/platform-browser';
import { Pipe, PipeTransform, SecurityContext } from '@angular/core';

@Pipe({
  name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): string {
    return (
      this.domSanitizer.sanitize(SecurityContext.HTML, value) ??
      'Not secure text'
    );
  }
}
