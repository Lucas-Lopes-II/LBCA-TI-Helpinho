import { Component, Input } from '@angular/core';
import { Help } from '../../../../shared/models';
import {
  FormataDataPipe,
  SharedPipesModuleModule,
} from '../../../../shared/pipes';

@Component({
  selector: 'details-help',
  standalone: true,
  imports: [SharedPipesModuleModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  @Input() help: Help | undefined = undefined;
}
