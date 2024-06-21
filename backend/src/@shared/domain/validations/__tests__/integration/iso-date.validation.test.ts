import { BadRequestError } from '@shared/domain/errors';
import { ISODateValidation, Validation } from '@shared/domain/validations';

describe('ISODateValidation integration tests', () => {
  let sut: Validation;
  const dataValidate = {
    date: new Date().toISOString(),
  };

  beforeEach(() => {
    sut = new ISODateValidation('date');
  });

  it('should vailidate correctly', async () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given date is not provided', async () => {
    dataValidate.date = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date is required`),
    );
  });

  it('should not throw a BadRequestError when the given date is not provided and isRequired flag is false', async () => {
    sut = new ISODateValidation('date', false);
    dataValidate.date = null;

    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given date is invalid', async () => {
    dataValidate.date = '2023-12-16';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );

    dataValidate.date = '2023-12-16T16:39';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );

    dataValidate.date = '2023-12-16T16:39:07';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );

    dataValidate.date = '202-12-1T16:39:07.929Z';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );

    dataValidate.date = '2023-12-16T16:39:07.929';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );

    dataValidate.date = '2023-12-16T16:39:07.99Z';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );

    dataValidate.date = '2023-12-16T16:39:07.92Z';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`date in invalid format`),
    );
  });
});
