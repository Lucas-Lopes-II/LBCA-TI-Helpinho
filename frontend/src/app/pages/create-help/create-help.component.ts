import { Component, inject } from '@angular/core';

import { StapsFormsComponent } from './components/staps-forms/staps-forms.component';

@Component({
  selector: 'create-help',
  standalone: true,
  imports: [StapsFormsComponent],
  templateUrl: './create-help.component.html',
})
export class CreateHelpComponent {}
