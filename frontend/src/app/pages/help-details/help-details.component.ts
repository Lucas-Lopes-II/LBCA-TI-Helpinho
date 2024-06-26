import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpService } from '../../shared/services';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { Help } from '../../shared/models';
import { ActivatedRoute } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { TabelaComponent } from './components/tabela/tabela.component';

@Component({
  selector: 'app-help-details',
  standalone: true,
  imports: [DetailsComponent, TabelaComponent],
  templateUrl: './help-details.component.html',
})
export class HelpDetailsComponent implements OnInit, OnDestroy {
  public help: Help | undefined = undefined;
  public helpId!: string;
  private readonly snackBar = inject(MatSnackBar);
  public readonly helpService = inject(HelpService);
  public readonly route = inject(ActivatedRoute);

  constructor() {
    this.helpId = this.route.snapshot.params['helpId'];
    this.getHelp();
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.helpService.help = undefined;
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
}
