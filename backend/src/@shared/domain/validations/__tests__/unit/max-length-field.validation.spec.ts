import {
  MaxLengthFieldValidation,
  Validation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

describe('MaxLengthFieldValidation unit tests', () => {
  let sut: Validation;
  const dataValidate = {
    name: 'João da Silva',
  };

  beforeEach(() => {
    sut = new MaxLengthFieldValidation('name', 100);
  });

  it('should vailidate correctly', async () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given name is not provided', async () => {
    dataValidate.name = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name is required`),
    );
  });

  it('should not throw a BadRequestError when the given name is not provided  and isRequired flag is false', async () => {
    sut = new MaxLengthFieldValidation('name', 100, false);
    dataValidate.name = null;

    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given name is not a string', async () => {
    dataValidate.name = 50 as any;

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name must be a string`),
    );
  });

  it('should throw a BadRequestError when the given name is too large', async () => {
    dataValidate.name = 'test'.repeat(26);

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(
        `name must contain a maximum of 100 characters`.trim(),
      ),
    );
  });
});
