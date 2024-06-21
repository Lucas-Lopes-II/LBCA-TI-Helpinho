import {
  Validation,
  RequiredFieldValidation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

export class MaxValueFieldValidation<T = any> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly maxValue: number,
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

    if (value > this.maxValue) {
      throw new BadRequestError(
        `${this.fieldName as any} must be at most ${this.maxValue}`.trim(),
      );
    }
  }

  private isRequiredValidate(input: T): void {
    const isRequiredValidator = new RequiredFieldValidation<T>(this.fieldName);
    isRequiredValidator.validate(input);
  }
}
