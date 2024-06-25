export interface DefaultUseCase<Input = unknown, Output = unknown> {
  execute(input: Input): Output | Promise<Output>;
}
