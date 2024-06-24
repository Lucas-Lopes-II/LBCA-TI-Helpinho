export interface IUpdate<T> {
  update(id: string, data: T): Promise<void>;
}
