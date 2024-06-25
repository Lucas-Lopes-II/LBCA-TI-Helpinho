import {
  Validation,
  Validator,
  RequiredFieldValidation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

export class StrongPasswordValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly isRequired: boolean = true,
  ) {}

  public validate(input: T): void {
    if (this.isRequired) {
      this.isRequiredValidate(input);
    } else if (!input[this.fieldName as string]) {
      return;
    }

    const isValid = Validator.isStrongPassword(input[this.fieldName as string]);

    if (!isValid) {
      throw new BadRequestError(`weak ${this.fieldName as string}`);
    }
  }

  private isRequiredValidate(input: T): void {
    const isRequiredValidator = new RequiredFieldValidation<T>(this.fieldName);
    isRequiredValidator.validate(input);
  }
}
