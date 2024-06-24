export interface ICreate<Input = unknown, Output = unknown> {
  create(data: Input): Promise<Output>;
}
