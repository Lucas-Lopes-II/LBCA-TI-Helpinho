import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Help } from '../../shared/models';
import { CardComponent } from '../../shared/components';
import { HelpService } from '../../shared/services';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public helps: Help[] = [];
  public isLoading = false;
  private readonly snackBar = inject(MatSnackBar);
  private readonly helpService = inject(HelpService);
  public currentPage = 1;

  ngOnInit(): void {
    this.getAllHelps(this.currentPage);
  }

  private getAllHelps(page: number): void {
    this.isLoading = true;
    this.helpService
      .getAll(page)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
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
}
