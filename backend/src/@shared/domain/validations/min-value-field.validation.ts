import {
  Validation,
  RequiredFieldValidation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

export class MinValueFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly minValue: number,
    private readonly isRequired: boolean = true,
  ) {}

  public validate(input: T): void {
    if (this.isRequired) {
      this.isRequiredValidate(input);
    } else if (!input[this.fieldName as string]) {
      return;
    }

    const value = input[this.fieldName] as number;

    if (typeof value !== 'number') {
      throw new BadRequestError(`${this.fieldName as any} must be a number`);
    }

    if (value < this.minValue) {
      throw new BadRequestError(
        `${this.fieldName as any} must be at least ${this.minValue}`.trim(),
      );
    }
  }

  private isRequiredValidate(input: T): void {
    const isRequiredValidator = new RequiredFieldValidation<T>(this.fieldName);
    isRequiredValidator.validate(input);
  }
}
