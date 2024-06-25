import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { take } from 'rxjs';
import { Help } from '../../shared/models';
import { LoggedUser } from '../../core/auth/models';
import { HelpService, UserService } from '../../shared/services';
import { CardComponent, PaginatorComponent } from '../../shared/components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule, PaginatorComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public helps: Help[] = [];
  public isLoading = false;
  public listMetaData = {
    currentPage: 1,
    total: 0,
    perpage: 10,
  };
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly helpService = inject(HelpService);

  ngOnInit(): void {
    this.getAllHelps(this.listMetaData.currentPage);
  }

  private getAllHelps(page: number): void {
    this.isLoading = true;
    this.helpService
      .getAll(page)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.listMetaData = {
            currentPage: response.currentPage,
            perpage: response.perPage,
            total: response.total,
          };
          this.helps = response.items;
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

  public onPrevius(): void {
    this.getAllHelps(this.listMetaData.currentPage - 1);
  }

  public onNext(): void {
    this.getAllHelps(this.listMetaData.currentPage + 1);
  }

  public openHelp(data: Help): void {
    this.helpService.help = data;
    this.router.navigateByUrl(`helps/${data.id}`);
  }
}
