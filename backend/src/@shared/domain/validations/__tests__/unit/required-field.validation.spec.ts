import {
  RequiredFieldValidation,
  Validation,
} from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';

describe('RequiredFieldValidation integration tests', () => {
  let sut: Validation;
  const dataValidate = {
    name: 'test_name',
  };

  beforeEach(() => {
    sut = new RequiredFieldValidation('name');
  });

  it('should vailidate correctly', async () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given name is not provided', async () => {
    dataValidate.name = undefined;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name is required`),
    );

    dataValidate.name = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name is required`),
    );

    dataValidate.name = '';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name is required`),
    );

    dataValidate.name = 0 as any;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`name is required`),
    );
  });
});
