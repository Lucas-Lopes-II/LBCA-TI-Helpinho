import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { Help } from '../../models';
import { HelpCategory } from '../../enums';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() cardData: (Help & { isOwner: boolean }) | undefined;
  @Output() onOpenHelp = new EventEmitter<Help & { isOwner: boolean }>();

  public openHelp(): void {
    this.onOpenHelp.emit(this.cardData);
  }
}
