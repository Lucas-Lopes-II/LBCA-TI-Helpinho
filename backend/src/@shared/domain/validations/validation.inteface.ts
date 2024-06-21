export interface Validation<T = any> {
  validate(input: T): void;
}
