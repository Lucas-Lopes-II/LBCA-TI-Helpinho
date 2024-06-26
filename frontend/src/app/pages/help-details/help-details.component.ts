import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

import { of, switchMap, take } from 'rxjs';
import { Help } from '../../shared/models';
import { ActivatedRoute, Router } from '@angular/router';
import { LoggedUser } from '../../core/auth/models';
import { HelpService, UserService } from '../../shared/services';
import { DetailsComponent } from './components/details/details.component';
import { TabelaComponent } from './components/tabela/tabela.component';

@Component({
  selector: 'app-help-details',
  standalone: true,
  imports: [DetailsComponent, TabelaComponent],
  templateUrl: './help-details.component.html',
})
export class HelpDetailsComponent implements OnInit {
  public helpId!: string;
  public help: Help | undefined = undefined;
  public user: LoggedUser | undefined = undefined;
  private readonly router = inject(Router);
  public readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  public readonly helpService = inject(HelpService);
  public readonly userService = inject(UserService);

  constructor() {
    this.helpId = this.route.snapshot.params['helpId'];
    this.getHelp();
  }

  ngOnInit(): void {
    this.user = this.userService.user();
  }

  private getHelp(): void {
    toObservable(this.helpService.help)
      .pipe(
        switchMap((data) => {
          if (!data) return this.helpService.getById(this.helpId);

          return of(data);
        }),
        takeUntilDestroyed()
      )
      .subscribe({
        next: (response) => {
          this.help = response;
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

  public deleteOrProvideHelp(helpId:string): void {
    this.helpService.delete(helpId).pipe(take(1)).subscribe({
      next: () => {
        this.snackBar.open('Helpinho deletado com sucesso!', 'fechar', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
        this.router.navigateByUrl('/home');
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
