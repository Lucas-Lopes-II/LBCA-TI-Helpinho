import {
  EmailValidation,
  RequiredFieldValidation,
  UUIDValidation,
  Validation,
  ValidationComposite,
} from '@shared/domain/validations';
import { randomUUID } from 'node:crypto';

interface IStubData {
  id: string;
  name: string;
  email: string;
}

describe('ValidationComposite unit tests', () => {
  let sut: Validation;

  const validation1 = new UUIDValidation('id');
  const validation2 = new RequiredFieldValidation('name');
  const validation3 = new EmailValidation('email');
  const dataValidate: IStubData = {
    id: randomUUID(),
    name: 'teste_name',
    email: 'test@test.com',
  };

  jest.spyOn(validation1, 'validate').mockReturnValue(null);
  jest.spyOn(validation2, 'validate').mockReturnValue(null);
  jest.spyOn(validation3, 'validate').mockReturnValue(null);

  beforeEach(() => {
    sut = new ValidationComposite<IStubData>([
      validation1,
      validation2,
      validation3,
    ]);
  });

  it('the sut, validation1, validation2 and validation3 should be defined', () => {
    expect(sut).toBeDefined();
    expect(validation1).toBeDefined();
    expect(validation2).toBeDefined();
    expect(validation3).toBeDefined();
  });

  it('should vailidate correctly', () => {
    expect(() => sut.validate(dataValidate)).not.toThrow();
  });

  it('should throw an exeption if validation1 throws', async () => {
    jest.spyOn(validation1, 'validate').mockImplementationOnce(() => {
      throw new Error('validation1');
    });
    expect(() => sut.validate(dataValidate)).toThrow(new Error('validation1'));
  });

  it('should throw an exeption if validation2 throws', async () => {
    jest.spyOn(validation2, 'validate').mockImplementationOnce(() => {
      throw new Error('validation2');
    });
    expect(() => sut.validate(dataValidate)).toThrow(new Error('validation2'));
  });

  it('should throw an exeption if validation3 throws', async () => {
    jest.spyOn(validation3, 'validate').mockImplementationOnce(() => {
      throw new Error('validation3');
    });
    expect(() => sut.validate(dataValidate)).toThrow(new Error('validation3'));
  });
});
