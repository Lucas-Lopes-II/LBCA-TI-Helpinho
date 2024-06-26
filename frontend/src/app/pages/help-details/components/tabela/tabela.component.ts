import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { HelpProvided, PagedList } from '../../../../shared/models';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HelpService } from '../../../../shared/services';
import { take } from 'rxjs';
import { SharedPipesModuleModule } from '../../../../shared/pipes';

@Component({
  selector: 'tabela-helps-provided',
  standalone: true,
  imports: [SharedPipesModuleModule],
  templateUrl: './tabela.component.html',
})
export class TabelaComponent implements OnInit, OnChanges {
  @Input() helpId: string | undefined = undefined;
  public helpsProvided:HelpProvided[] = [];
  public isLoading = false;
  public listMetaData = {
    currentPage: 1,
    total: 0,
    perpage: 10,
  };
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly helpService = inject(HelpService);

  ngOnChanges(): void {
    this.getAllHelps(this.listMetaData.currentPage);
  }

  ngOnInit(): void {
    this.getAllHelps(this.listMetaData.currentPage);
  }

  private getAllHelps(page: number): void {
    if(this.helpId) {
      this.isLoading = true;
    this.helpService
      .getAllHelpsProvided(page, this.helpId)
      .pipe(take(1))
      .subscribe({
        next: (response: PagedList<HelpProvided>) => {
          this.listMetaData = {
            currentPage: response.currentPage,
            perpage: response.perPage,
            total: response.total,
          };
          this.helpsProvided = response.items;
        },
        error: () => {
          this.snackBar.open('Ocorreu algum problema', 'fechar', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }
}
