import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchingButtonDirective } from './fetching-button.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [FetchingButtonDirective],
  exports: [FetchingButtonDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
