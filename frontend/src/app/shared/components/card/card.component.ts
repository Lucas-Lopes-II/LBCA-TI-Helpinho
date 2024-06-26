import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';

import { Help } from '../../models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() cardData: Help | undefined;
  @Input() demo = false;
  @Output() onOpenHelp = new EventEmitter<Help>();
  private readonly snackBar = inject(MatSnackBar);

  ngOnChanges() {
    console.log(this.cardData);
  }
  public openHelp(): void {
    if (this.demo) {
      this.snackBar.open('É apenas uma demonstração', 'fechar', {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
    } else {
      this.onOpenHelp.emit(this.cardData);
    }
  }
}
