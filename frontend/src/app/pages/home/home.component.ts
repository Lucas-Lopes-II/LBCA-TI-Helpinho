import { Component } from '@angular/core';
import { CardComponent } from '../../shared/components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
