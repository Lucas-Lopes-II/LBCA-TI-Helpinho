import { FileDTO } from './dtos';

export interface StorageResponseDto {
  fileUrl: string;
}

export interface IStorage<T = StorageResponseDto> {
  upload(data: FileDTO, folder: string, hash?: string): Promise<T>;

  delete(fileUrl: string): Promise<void>;
}
