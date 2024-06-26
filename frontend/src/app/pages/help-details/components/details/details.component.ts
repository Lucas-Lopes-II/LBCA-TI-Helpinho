import { MatButtonModule } from '@angular/material/button';
import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';

import { Help } from '../../../../shared/models';
import { LoggedUser } from '../../../../core/auth/models';
import { SharedPipesModuleModule } from '../../../../shared/pipes';
import { Router } from '@angular/router';

@Component({
  selector: 'details-help',
  standalone: true,
  imports: [SharedPipesModuleModule, MatButtonModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnChanges {
  @Input() help: Help | undefined = undefined;
  @Input() user: LoggedUser | undefined = undefined;
  @Input() showButton: boolean = true;
  @Output() onDelete = new EventEmitter<string>();
  private readonly router = inject(Router);
  public isOwner: boolean = false;

  ngOnChanges(): void {
    this.isOwner = this.help?.userHelped === this.user?.id;
  }

  public deleteOrProvideHelp(): void {
    if(this.isOwner) {
      this.onDelete.emit(this.help?.id)
    } else {
      this.router.navigateByUrl(`/helps/${this.help?.id}/provided/create`);
    }
  }
}
