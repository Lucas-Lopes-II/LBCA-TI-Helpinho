import {
  Validation,
  RequiredFieldValidation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

export class EnumValidation<T = any, E = Enumerator> implements Validation<T> {
  constructor(
    private readonly fieldName: keyof T,
    private readonly enumToCompare: E,
    private readonly enumName?: string,
    private readonly isRequired: boolean = true,
  ) {}

  public validate(input: T): void {
    const value = input[this.fieldName] as any;
    if (this.isRequired) {
      this.isRequiredValidate(input);
    } else if (!value) {
      return;
    }

    const values = Object.values(this.enumToCompare);

    if (!values.includes(value)) {
      throw new BadRequestError(
        `${this.fieldName as any} should be type enum ${this.enumName || ''}`.trim(),
      );
    }
  }

  private isRequiredValidate(input: T): void {
    const isRequiredValidator = new RequiredFieldValidation<T>(this.fieldName);
    isRequiredValidator.validate(input);
  }
}
