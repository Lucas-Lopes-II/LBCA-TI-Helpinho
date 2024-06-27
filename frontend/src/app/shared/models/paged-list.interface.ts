export interface PagedList<T> {
  items: T[];
  currentPage: number;
  total: number;
  lastPage: number;
  perPage: number;
}
