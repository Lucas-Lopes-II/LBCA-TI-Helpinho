import {
  Validation,
  RequiredFieldValidation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

export class MinLengthFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly minLength: number,
    private readonly isRequired: boolean = true,
  ) {}

  public validate(input: T): void {
    if (this.isRequired) {
      this.isRequiredValidate(input);
    } else if (!input[this.fieldName as string]) {
      return;
    }

    const value = input[this.fieldName] as string;

    if (typeof value !== 'string') {
      throw new BadRequestError(`${this.fieldName as any} must be a string`);
    }

    if (value.length < this.minLength) {
      throw new BadRequestError(
        `${this.fieldName as any} must contain at least ${
          this.minLength
        } characters`.trim(),
      );
    }
  }

  private isRequiredValidate(input: T): void {
    const isRequiredValidator = new RequiredFieldValidation<T>(this.fieldName);
    isRequiredValidator.validate(input);
  }
}
