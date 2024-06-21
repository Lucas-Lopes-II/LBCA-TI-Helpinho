import { randomUUID } from 'node:crypto';
import { BadRequestError } from '@shared/domain/errors';
import { UUIDValidation, Validation } from '@shared/domain/validations';

describe('UUIDValidation integration tests', () => {
  let sut: Validation;
  const dataValidate = {
    id: randomUUID(),
  };

  beforeEach(() => {
    sut = new UUIDValidation('id');
  });

  it('should vailidate correctly', () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given id is not provided', async () => {
    dataValidate.id = null;
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`id is required`),
    );
  });

  it('should not throw a BadRequestError when the given id is not provided and isRequired flag is false', async () => {
    sut = new UUIDValidation('id', false);
    dataValidate.id = null;

    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw a BadRequestError when the given id is invalid', async () => {
    dataValidate.id = '59d4c26f-0487-4772-ac03-2171ffee62e';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`id in invalid format`),
    );

    dataValidate.id = '9d4c26f-0487-4772-ac03-2171ffee62e1';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`id in invalid format`),
    );

    dataValidate.id = '59d4c26f-0487-4772-ac0-2171ffee62e1';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`id in invalid format`),
    );

    dataValidate.id = '59d4c26f-0487-477-ac03-2171ffee62e1';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`id in invalid format`),
    );

    dataValidate.id = '59d4c26f-048-4772-ac03-2171ffee62e1';
    expect(() => sut.validate(dataValidate)).toThrow(
      new BadRequestError(`id in invalid format`),
    );
  });
});
