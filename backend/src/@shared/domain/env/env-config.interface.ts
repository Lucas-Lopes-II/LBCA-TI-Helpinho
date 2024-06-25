export interface IEnvConfig {
  getAppPort(): number;
  getSecretKeyToken(): string;
  getUsersTableName(): string;
  getHelpsTableName(): string;
  getRegion(): string;
  getBucketName(): string;
  getBucketUrl(): string;
}
