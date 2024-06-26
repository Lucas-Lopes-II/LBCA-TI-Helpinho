import { Component, inject } from '@angular/core';

import { StapsFormsComponent } from './components/staps-forms/staps-forms.component';
import { CreateHelpDTO } from '../../shared/models/create-help.dto';
import { HelpService } from '../../shared/services';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Help } from '../../shared/models';

@Component({
  selector: 'create-help',
  standalone: true,
  imports: [StapsFormsComponent],
  templateUrl: './create-help.component.html',
})
export class CreateHelpComponent {
  public readonly helpService = inject(HelpService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  public onRecevedData(data: CreateHelpDTO): void {
    this.helpService
      .createHelp(data)
      .pipe(take(1))
      .subscribe({
        next: (response: Help) => {
          this.snackBar.open('Helpinho criado com sucesso!', 'fechar', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
          this.helpService.help = response;
          this.router.navigateByUrl(`helps/${response.id}`);
        },
        error: () => {
          this.snackBar.open('Ocorreu algum problema', 'fechar', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
      });
  }
}
