import { Component, Input } from '@angular/core';

@Component({
  selector: 'tabela-helps-provided',
  standalone: true,
  imports: [],
  templateUrl: './tabela.component.html',
})
export class TabelaComponent {
  @Input() helpId: string | undefined = undefined;
}
