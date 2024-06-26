import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, EventEmitter, inject, Output } from '@angular/core';

import { FileTypes, HelpCategory } from '../../../../shared/enums';
import { CreateHelpDTO } from '../../../../shared/models/create-help.dto';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { validSizeFile, validTypeFile } from '../../../../shared/validators';

@Component({
  selector: 'staps-forms',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgxMaskDirective,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [provideNgxMask()],
  templateUrl: './staps-forms.component.html',
})
export class StapsFormsComponent {
  private readonly formBuilder = inject(FormBuilder);
  public readonly firstFormGroup = this.formBuilder.group({
    category: ['', Validators.required],
  });
  public readonly secondFormGroup = this.formBuilder.group({
    title: ['', Validators.required],
    file: ['', Validators.required],
    description: ['', Validators.required],
  });
  public readonly thirdFormGroup = this.formBuilder.group({
    deadline: ['', Validators.required],
    pixKey: ['', Validators.required],
    value: ['', Validators.required],
  });
  public categories = Object.values(HelpCategory);
  public fileSizeError = false;
  public fileTypeError = false;
  @Output() onSendData = new EventEmitter<CreateHelpDTO>();

  public sendData(): void {
    const allformsValids =
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid;
    if (allformsValids) {
      this.onSendData.emit({
        category: this.firstFormGroup?.value['category'] as HelpCategory,
        title: this.secondFormGroup?.value['title'] as string,
        description: this.secondFormGroup?.value['description'] as string,
        file: this.secondFormGroup?.value['file'] as unknown as File,
        value: Number(this.thirdFormGroup?.value['value']),
        deadline: (
          this.thirdFormGroup?.value?.['deadline'] as unknown as Date
        ).toISOString(),
        pixKey: this.thirdFormGroup?.value['pixKey'] || '',
      });
    }
  }

  public prepereFilePreView(): void {
    console.log('chamou prepereFilePreView()');
  }

  chegeFile(event: any): void {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      const typesAccept = [FileTypes.GIF, FileTypes.JPG, FileTypes.PNG];
      this.fileSizeError = validSizeFile(file, 5) ? false : true;
      this.fileTypeError = validTypeFile(file, typesAccept) ? false : true;
    } else {
      this.fileSizeError = false;
      this.fileTypeError = false;
    }
  }
}
