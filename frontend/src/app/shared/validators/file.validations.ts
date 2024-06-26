import { AbstractControl, ValidatorFn } from '@angular/forms';

import { FileTypes } from '../enums';

export function validTypeFile(
  file: File | null,
  fileTypes: FileTypes[]
): boolean {
  if (file) {
    const typeCorrect = fileTypes.some((fileType) => fileType === file.type);
    if (typeCorrect) {
      return true;
    }

    return false;
  }

  return true;
}

export function validSizeFile(file: File, sizeInMegabytes: number): boolean {
  if (file) {
    const fileSizeEmMegabytes: number = file.size / 1048576;
    if (fileSizeEmMegabytes <= sizeInMegabytes) {
      return true;
    }

    return false;
  }

  return true;
}
