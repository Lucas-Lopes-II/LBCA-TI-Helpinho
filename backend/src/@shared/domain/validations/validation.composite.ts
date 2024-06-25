import { Validation } from './validation.inteface';

export class ValidationComposite<T = any> implements Validation<T> {
  constructor(private readonly validations: Validation<T>[]) {}

  validate(input: T): void {
    for (const validation of this.validations) {
      validation.validate(input);
    }
  }
}
