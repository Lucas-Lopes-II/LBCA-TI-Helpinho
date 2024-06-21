import { randomUUID } from 'node:crypto';
import { Validator } from '@shared/domain/validations';

describe('Validator unit tests', () => {
  const sut = Validator;

  it('the sut should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('Validator.isEmail', () => {
    it('should return true when the given email is valid', () => {
      expect(sut.isEmail('tes@tes.com')).toBeTruthy();
    });

    it('should return false when the given email is invalid', () => {
      expect(sut.isEmail('@dsf.com')).toBeFalsy();
      expect(sut.isEmail('ssdwd.com')).toBeFalsy();
      expect(sut.isEmail('swddw@')).toBeFalsy();
      expect(sut.isEmail('dsa@defew')).toBeFalsy();
    });
  });

  describe('Validator.isUUID', () => {
    it('should return true when the given uuid is valid', () => {
      expect(sut.isUUID(randomUUID())).toBeTruthy();
    });

    it('should return false when the given uuid is invalid', () => {
      expect(sut.isUUID('59d4c26f-0487-4772-ac03-2171ffee62e')).toBeFalsy();
      expect(sut.isUUID('9d4c26f-0487-4772-ac03-2171ffee62e1')).toBeFalsy();
      expect(sut.isUUID('59d4c26f-0487-4772-ac0-2171ffee62e1')).toBeFalsy();
      expect(sut.isUUID('59d4c26f-0487-477-ac03-2171ffee62e1')).toBeFalsy();
      expect(sut.isUUID('59d4c26f-048-4772-ac03-2171ffee62e1')).toBeFalsy();
    });
  });

  describe('Validator.isStrongPassWord', () => {
    it('should return true for a strong password', () => {
      expect(sut.isStrongPassword('Test@123')).toBeTruthy();
    });

    it('should return false for a weak password', () => {
      expect(sut.isStrongPassword('test@123')).toBeFalsy();
      expect(sut.isStrongPassword('Test@sd')).toBeFalsy();
      expect(sut.isStrongPassword('test123')).toBeFalsy();
      expect(sut.isStrongPassword('Ts@13')).toBeFalsy();
      expect(sut.isStrongPassword('T12@123')).toBeFalsy();
      expect(sut.isStrongPassword('*#¨%@!"')).toBeFalsy();
    });
  });

  describe('Validator.isISODate', () => {
    it('should return true when the given iso date is valid', () => {
      expect(sut.isISODate('2023-12-16T16:39:07.929Z')).toBeTruthy();
    });

    it('should return false when the given iso date is invalid', () => {
      expect(sut.isISODate('2023-12-16')).toBeFalsy();
      expect(sut.isISODate('2023-12-16T16:39')).toBeFalsy();
      expect(sut.isISODate('2023-12-16T16:39:07')).toBeFalsy();
      expect(sut.isISODate('202-12-1T16:39:07.929Z')).toBeFalsy();
      expect(sut.isISODate('202-12-1T16:39:07.929Z')).toBeFalsy();
      expect(sut.isISODate('2023-12-16T16:39:07.929')).toBeFalsy();
      expect(sut.isISODate('2023-12-16T16:39:07.92Z')).toBeFalsy();
      expect(sut.isISODate('2023-12-16T16:39:07.99Z')).toBeFalsy();
      expect(sut.isISODate('2023-12-16T16:39:07929Z')).toBeFalsy();
      expect(sut.isISODate('2023-1-16T16:39:07.929Z')).toBeFalsy();
      expect(sut.isISODate('202-12-16T16:39:07.929Z')).toBeFalsy();
      expect(sut.isISODate('2023-12-1616:39:07.929Z')).toBeFalsy();
    });
  });
});
