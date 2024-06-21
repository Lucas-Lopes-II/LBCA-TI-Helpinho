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
}
