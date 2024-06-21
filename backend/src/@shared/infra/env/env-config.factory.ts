import { IEnvConfig } from './../../domain/env';
import { EnvConfig } from './env-config.adapter';

export class EnvConfigFactory {
  static create(): IEnvConfig {
    return new EnvConfig();
  }
}
