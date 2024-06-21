import { IHasher } from '@shared/infra/crypto/hasher';
import { BcryptAdapter } from '@shared/infra/crypto/hasher';

export const hasherFactory = (): IHasher => {
  return new BcryptAdapter();
};
