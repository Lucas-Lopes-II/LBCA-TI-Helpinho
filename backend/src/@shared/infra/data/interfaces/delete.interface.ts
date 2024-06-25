export interface IDelete {
  delete(id: string): Promise<void>;
}
