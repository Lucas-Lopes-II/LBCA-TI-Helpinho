export type SortDirection = 'ASC' | 'DESC';

export type SearchProps<Filter = unknown> = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
  field?: string | null;
};

export type SearchResultProps<E, Filter> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
  sort: string | null;
  sortDir: string | null;
  filter: Filter | null;
};

export class SearchParams<Filter = unknown> {
  protected _perPage = 10;
  protected _sort: string | null;
  protected _field: string | null;
  protected _sortDir: SortDirection | null;
  protected _filter: Filter | null;
  protected _page: number;

  constructor(props: SearchProps<Filter> = {}) {
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

  get field(): string | null {
    return this._field;
  }

  private set field(value: string | null) {
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

  get filter(): Filter | null {
    return this._filter;
  }

  private set filter(value: Filter | null) {
    this._filter =
      value === null || value === undefined || value === ''
        ? null
        : (`${value}` as any);
  }
}

export class SearchResult<E, Filter = unknown> {
  public readonly items: E[];
  public readonly total: number;
  public readonly currentPage: number;
  public readonly perPage: number;
  public readonly lastPage: number;
  public readonly sort: string | null;
  public readonly sortDir: string | null;
  public readonly filter: Filter | null;

  constructor(props: Omit<SearchResultProps<E, Filter>, 'lastPage'>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
    this.sort = props.sort ?? null;
    this.sortDir = props.sortDir ?? null;
    this.filter = props.filter ?? null;
  }

  public toJSON(): SearchResultProps<E, Filter> {
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
  Filter = unknown,
  SearchOutput = SearchResult<E, Filter>,
> {
  search<T>(
    props?: SearchParams<T>,
    whereConditions?: object | null,
  ): Promise<SearchOutput>;
}
