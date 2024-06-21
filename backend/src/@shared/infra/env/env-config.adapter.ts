import { IEnvConfig } from '@shared/domain/env';
import { config } from 'dotenv';

config();

export class EnvConfig implements IEnvConfig {
  public getAppPort(): number {
    return Number(process?.env?.PORT);
  }

  public getNodeEnv(): string {
    return process?.env?.NODE_ENV?.toString();
  }

  public getDbHost(): string {
    return process.env.DATABASE_HOST?.toString();
  }

  public getDBPort(): number {
    return Number(process.env?.DATABASE_PORT);
  }

  public getDbUserName(): string {
    return process.env.DATABASE_USER_NAME?.toString();
  }

  public getDbPassword(): string {
    return process.env.DATABASE_PASSWORD?.toString();
  }

  public getDbName(): string {
    return process.env.DATABASE_NAME?.toString();
  }
}
