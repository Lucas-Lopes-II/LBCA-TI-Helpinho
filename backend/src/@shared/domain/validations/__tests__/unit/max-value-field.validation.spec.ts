import {
  MaxValueFieldValidation,
  Validation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

describe('MaxValueFieldValidation unit tests', () => {
  let sut: Validation;
  const dataValidate = {
    age: 20,
  };

  beforeEach(() => {
    sut = new MaxValueFieldValidation('age', 120);
  });

  it('should vailidate correctly', async () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given age is not provided', async () => {
    dataValidate.age = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`age is required`),
    );
  });

  it('should not throw a BadRequestError when the given age is not provided and isRequired flag is false', async () => {
    sut = new MaxValueFieldValidation('age', 120, false);
    dataValidate.age = null;

    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given age is not a number', async () => {
    dataValidate.age = 'test' as any;

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`age must be a number`),
    );
  });

  it('should throw a BadRequestError when the given age bigger than the limit', async () => {
    dataValidate.age = 121;

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`age must be at most 120`.trim()),
    );
  });
});
