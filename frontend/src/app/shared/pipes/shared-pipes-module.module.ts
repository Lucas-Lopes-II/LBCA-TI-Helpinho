import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormataDataPipe } from './formata-data.pipe';

@NgModule({
  declarations: [FormataDataPipe],
  imports: [CommonModule],
  exports: [FormataDataPipe],
})
export class SharedPipesModuleModule {}
