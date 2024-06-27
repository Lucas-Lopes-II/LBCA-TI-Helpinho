import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormataDataPipe } from './formata-data.pipe';
import { NumberFloatPipe } from './number-float.pipe';

@NgModule({
  declarations: [FormataDataPipe, NumberFloatPipe],
  imports: [CommonModule],
  exports: [FormataDataPipe, NumberFloatPipe],
})
export class SharedPipesModuleModule {}
