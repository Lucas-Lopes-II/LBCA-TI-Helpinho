export interface IFindById<Output = unknown> {
  findById(id: string): Promise<Output | undefined>;
}
