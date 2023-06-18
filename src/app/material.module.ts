import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [MatButtonModule, MatSelectModule, MatFormFieldModule],
  exports: [MatButtonModule, MatSelectModule, MatFormFieldModule],
})
export class MaterialAppModule {}
