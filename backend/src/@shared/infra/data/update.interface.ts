export interface IUpdate<T> {
  update(id: string, data: Partial<T>): Promise<void>;
}
