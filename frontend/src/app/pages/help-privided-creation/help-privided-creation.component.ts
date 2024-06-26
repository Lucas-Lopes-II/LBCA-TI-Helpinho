import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { of, switchMap } from 'rxjs';
import { DetailsComponent } from '../help-details';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { HelpService, UserService } from '../../shared/services';
import { CreateHelpProvidedDTO, Help } from '../../shared/models';

@Component({
  selector: 'help-privided-creation',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
    DetailsComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './help-privided-creation.component.html',
})
export class HepPrividedCreationComponent implements OnInit {
  public helpId!: string;
  public help: Help | undefined = undefined;
  public registerForm!: FormGroup;
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);
  public readonly route = inject(ActivatedRoute);
  private readonly snackBar = inject(MatSnackBar);
  public readonly helpService = inject(HelpService);

  constructor() {
    this.helpId = this.route.snapshot.params['helpId'];
    this.getHelp();
  }

  ngOnInit(): void {
    this.initform();
  }

  private initform(): void {
    this.registerForm = this.formBuilder.group({
      value: [null, [Validators.required]],
      executionDate: ['', [Validators.required]],
    });
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
        next: (response: Help | undefined) => {
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

  public createHelpProvided(): void {
    if(this.registerForm.valid) {
      const data: CreateHelpProvidedDTO={
        helpId: this.helpId,
        userHelped: this.help!.userHelped,
        value: this.registerForm.value['value'],
        executionDate: (this.registerForm.value['executionDate'] as Date).toISOString(),
      }
      
      this.helpService.createHelpProvided(data).subscribe({
        next: () => {
          this.snackBar.open('Sucesso! Help sob análise', 'fechar', {
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
}
