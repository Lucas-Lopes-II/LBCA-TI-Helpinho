export interface IEnvConfig {
  getAppPort(): number;
  getUsersTableName(): string;
  getRegion(): string;
  getBucketName(): string;
  getBucketUrl(): string;
}
