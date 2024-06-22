import { IEnvConfig } from '@shared/domain/env';
import { config } from 'dotenv';

config();

export class EnvConfig implements IEnvConfig {
  public getAppPort(): number {
    return Number(process?.env?.PORT);
  }

  public getUsersTableName(): string {
    return String(process?.env?.USERS_TABLE);
  }

  public getRegion(): string {
    return String(process?.env?.REGION);
  }

  public getBucketName(): string {
    return String(process?.env?.BUCKET_NAME);
  }

  public getBucketUrl(): string {
    return String(process?.env?.BUCKET_URL);
  }

  public getSecretKeyToken(): string {
    return String(process?.env?.SECRET_TOKEN);
  }
}
