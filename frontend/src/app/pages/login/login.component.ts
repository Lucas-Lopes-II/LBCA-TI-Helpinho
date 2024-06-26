import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { take } from 'rxjs';
import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  public isLoading = false;

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rememberMe: [''],
    });
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService
        .signIn(this.loginForm.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isLoading = true;
            this.router.navigateByUrl('home');
          },
          error: () => {
            this.isLoading = true;
            this.snackBar.open('Ocorreu algum problema', 'fechar', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
          },
        });
    }
  }
}
