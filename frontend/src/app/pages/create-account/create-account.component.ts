import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { strongPasswordValidator } from '../../shared/validators';

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
    console.log(this.registerForm.value);
  }
}
