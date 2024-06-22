import { FileDTO } from '@shared/infra/storage/dtos';
import { IStorage, StorageResponseDto } from '@shared/infra/storage';

export class StorageAdapter implements IStorage {
  public async upload(
    data: FileDTO,
    folder: string,
    hash: string = '',
  ): Promise<StorageResponseDto> {
    console.log(data, folder, hash);

    return {
      fileUrl: 'file url',
    };
  }

  public async delete(folder: string, fileUrl: string): Promise<void> {
    console.log(folder, fileUrl);

    return;
  }
}
