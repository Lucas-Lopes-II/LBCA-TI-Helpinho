import { Validation } from '@shared/domain/validations';
import { BadRequestError } from '@shared/domain/errors';
import { EnumValidation } from '../../enum.validation';

enum Test {
  TEST1 = 1,
  TEST2,
  TEST3,
}

describe('EnumValidation unit tests', () => {
  let sut: Validation<{ field: Test }>;
  const dataValidate = {
    field: Test.TEST1,
  };

  beforeEach(() => {
    sut = new EnumValidation('field', Test, 'Test');
  });

  it('should vailidate correctly', async () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given field is not provided', async () => {
    dataValidate.field = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`field is required`),
    );
  });

  it('should not throw a BadRequestError when the given field is not provided and isRequired flag is false', async () => {
    sut = new EnumValidation('field', Test, null, false);
    dataValidate.field = null;

    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given field is not a number', async () => {
    dataValidate.field = 15 as any;

    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`field should be type enum Test`),
    );

    sut = new EnumValidation('field', Test, null);
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`field should be type enum`),
    );
  });
});
