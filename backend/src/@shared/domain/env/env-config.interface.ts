export interface IEnvConfig {
  getAppPort(): number;
  getSecretKeyToken(): string;
  getUsersTableName(): string;
  getRegion(): string;
  getBucketName(): string;
  getBucketUrl(): string;
}
