import { IStorage, StorageAdapter } from '@shared/infra/storage';

export class StorageFactory {
  public static create(): IStorage {
    return new StorageAdapter();
  }
}
