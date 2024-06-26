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
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';

import { FileTypes, HelpCategory } from '../../../../shared/enums';
import { CreateHelpDTO } from '../../../../shared/models/create-help.dto';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { validSizeFile, validTypeFile } from '../../../../shared/validators';
import { CardComponent } from '../../../../shared/components';
import { Help } from '../../../../shared/models';
import { LoggedUser } from '../../../../core/auth/models';
import { FileUtilsService, UserService } from '../../../../shared/services';

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
    CardComponent,
  ],
  providers: [provideNgxMask()],
  templateUrl: './staps-forms.component.html',
})
export class StapsFormsComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  public readonly userService = inject(UserService);
  public readonly fileUtilsService = inject(FileUtilsService);

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
  public file: File | null = null;
  public createHelpDta: CreateHelpDTO | any = null;
  public helpToPreview: Help | undefined = undefined;
  public user: LoggedUser | undefined = undefined;

  @Output() onSendData = new EventEmitter<CreateHelpDTO>();

  ngOnInit(): void {
    this.user = this.userService.user();
  }

  public sendData(): void {
    const allformsValids =
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid;
    if (allformsValids) {
      this.createHelpDta = {
        category: this.firstFormGroup?.value['category'] as HelpCategory,
        title: this.secondFormGroup?.value['title'] as string,
        description: this.secondFormGroup?.value['description'] as string,
        file: this.file as File,
        value: Number(this.thirdFormGroup?.value['value']),
        deadline: (
          this.thirdFormGroup?.value?.['deadline'] as unknown as Date
        ).toISOString(),
        pixKey: this.thirdFormGroup?.value['pixKey'] || '',
      };
      this.onSendData.emit(this.createHelpDta);
    }
  }

  public prepereFilePreView(): void {
    this.fileUtilsService.conveteParaBase64(this.file!).then((base64) => {
      const imgUrl = this.fileUtilsService.base64ToDataURL(base64 as string);
      this.helpToPreview = {
        id: '',
        category: this.firstFormGroup?.value['category'] as HelpCategory,
        title: this.secondFormGroup?.value['title'] as string,
        description: this.secondFormGroup?.value['description'] as string,
        imgUrl: imgUrl,
        value: Number(this.thirdFormGroup?.value['value']),
        deadline: (
          this.thirdFormGroup?.value?.['deadline'] as unknown as Date
        ).toISOString(),
        pixKey: this.thirdFormGroup?.value['pixKey'] || '',
        helpValue: 0,
        userHelped: '',
        userName: this.user?.name as string,
      };
    });
  }

  chegeFile(event: any): void {
    if (event.target.files[0]) {
      const inputFile = event.target.files[0];
      const typesAccept = [FileTypes.GIF, FileTypes.JPG, FileTypes.PNG];
      this.fileSizeError = validSizeFile(inputFile, 5) ? false : true;
      this.fileTypeError = validTypeFile(inputFile, typesAccept) ? false : true;
      this.file = inputFile;
    } else {
      this.fileSizeError = false;
      this.fileTypeError = false;
    }
  }
}
