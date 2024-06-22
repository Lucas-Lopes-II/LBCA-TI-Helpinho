import { hash, compare } from 'bcryptjs';
import { IHasher } from '@shared/infra/crypto/hasher';

export class BcryptAdapter implements IHasher {
  public hash(data: string | Buffer): Promise<string> {
    return hash(data, 12);
  }

  public compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
