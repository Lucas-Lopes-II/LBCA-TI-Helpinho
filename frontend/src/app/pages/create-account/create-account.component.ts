import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { take } from 'rxjs';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { strongPasswordValidator } from '../../shared/validators';
import { UserService } from '../../shared/services';

@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './create-account.component.html',
})
export class CreateAccountComponent implements OnInit {
  public registerForm!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fone: ['', [Validators.required]],
      password: ['', [Validators.required, strongPasswordValidator]],
    });
  }

  public register(): void {
    this,
      this.userService
        .regirter(this.registerForm.value)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.snackBar.open('Cadatro realizado com sucesso!', 'fechar', {
              duration: 2000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            });
            this.router.navigateByUrl('login');
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
