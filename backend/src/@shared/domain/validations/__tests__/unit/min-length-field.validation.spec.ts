import { BadRequestError } from '@shared/domain/errors';
import {
  MinLengthFieldValidation,
  Validation,
} from '@shared/domain/validations';

describe('MinLengthFieldValidation unit tests', () => {
  let sut: Validation;
  const dataValidate = {
    name: 'João da Silva',
  };

  beforeEach(() => {
    sut = new MinLengthFieldValidation('name', 2);
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

  it('should not throw a BadRequestError when the given name is not provided and isRequired flag is false', async () => {
    sut = new MinLengthFieldValidation('name', 2, false);
    dataValidate.name = null;

    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given name is not a string', async () => {
    dataValidate.name = 50 as any;

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name must be a string`),
    );
  });

  it('should throw a BadRequestError when the given name is too small', async () => {
    dataValidate.name = 't';

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name must contain at least 2 characters`.trim()),
    );
  });
});
