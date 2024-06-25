import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { IEnvConfig } from '@shared/domain/env';
import { EnvConfigFactory } from '@shared/infra/env';
import { FileDTO } from '@shared/infra/storage/dtos';
import { InternalServerError } from '@shared/domain/errors';
import { IStorage, StorageResponseDto } from '@shared/infra/storage';

export class StorageAdapter implements IStorage {
  private readonly envConfig: IEnvConfig;
  private readonly s3Client: S3Client;
  private readonly bucketUrl: string;
  private readonly bucketName: string;

  constructor() {
    this.envConfig = EnvConfigFactory.create();
    this.bucketName = this.envConfig.getBucketName();
    this.bucketUrl = this.envConfig.getBucketUrl();
    this.s3Client = new S3Client({
      region: this.envConfig.getRegion(),
    });
  }

  public async upload(
    data: FileDTO,
    folder: string,
    hash: string = '',
  ): Promise<StorageResponseDto> {
    const params = {
      Bucket: this.bucketName,
      Key: `${folder}/${hash}-${data.originalname}`,
      Body: data.buffer,
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      const signedUrl = `${this.bucketUrl}/${params.Key}`;

      return {
        fileUrl: signedUrl,
      };
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      throw new InternalServerError('Erro ao fazer upload');
    }
  }

  public async delete(fileUrl: string): Promise<void> {
    const params = {
      Bucket: this.bucketName,
      Key: fileUrl.replace(`${this.bucketUrl}/`, ''),
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw new InternalServerError('Erro ao deletar arquivo');
    }
  }
}
