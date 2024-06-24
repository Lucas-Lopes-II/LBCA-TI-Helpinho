export type SortDirection = 'ASC' | 'DESC';

export type SearchProps<Field = unknown> = {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: unknown;
  field?: Field;
};

export type SearchResultProps<E> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  sort?: string;
  sortDir?: string;
  filter?: unknown;
};

export class SearchParams<Field = unknown> {
  protected _perPage = 10;
  protected _sort: string | null;
  protected _field: Field | null;
  protected _sortDir: SortDirection | null;
  protected _filter: unknown | null;
  protected _page: number;

  constructor(props: SearchProps<Field> = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
    this.sort = props.sort;
    this.sortDir = props.sortDir;
    this.filter = props.filter;
    this.field = props.field;
  }

  get page(): number {
    return this._page;
  }

  private set page(value: number) {
    let _page = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get perPage(): number {
    return this._perPage;
  }

  private set perPage(value: number) {
    let _perPage = value === (true as any) ? this._perPage : +value;
    if (
      Number.isNaN(_perPage) ||
      _perPage <= 0 ||
      parseInt(_perPage as any) !== _perPage
    ) {
      _perPage = this._perPage;
    }

    this._perPage = _perPage;
  }

  get sort(): string {
    return this._sort;
  }

  private set sort(value: string | null) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  get field(): Field | null {
    return this._field;
  }

  private set field(value: Field | null) {
    this._field =
      value === null || value === undefined || value === ''
        ? null
        : (`${value}` as any);
  }

  get sortDir(): SortDirection {
    return this._sortDir;
  }

  private set sortDir(value: string | null) {
    if (!this.sort) {
      this._sortDir = null;

      return;
    }

    const dir = `${value}`.toUpperCase();
    this._sortDir = dir !== 'ASC' && dir !== 'DESC' ? 'DESC' : dir;
  }

  get filter(): unknown | null {
    return this._filter;
  }

  private set filter(value: unknown | null) {
    this._filter =
      value === null || value === undefined || value === ''
        ? null
        : (`${value}` as any);
  }
}

export class SearchResult<E> {
  public readonly items: E[];
  public readonly total: number;
  public readonly currentPage: number;
  public readonly perPage: number;
  public readonly lastPage: number;
  public readonly sort: string | null;
  public readonly sortDir: string | null;
  public readonly filter: unknown | null;

  constructor(props: Omit<SearchResultProps<E>, 'lastPage'>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.sortDir = props.sortDir ?? null;
    this.filter = props.filter ?? null;
  }

  public toJSON(): SearchResultProps<E> {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
      sort: this.sort,
      sortDir: this.sortDir,
      filter: this.filter,
    };
  }
}

export interface ISearchableRepository<
  E,
  Field = unknown,
  SearchOutput = SearchResult<E>,
> {
  search(props?: SearchParams<Field>): Promise<SearchOutput>;
}
