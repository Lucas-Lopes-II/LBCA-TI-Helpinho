export abstract class IHasher {
  abstract hash(data: string | Buffer): Promise<string>;

  abstract compare(data: string | Buffer, encrypted: string): Promise<boolean>;
}
