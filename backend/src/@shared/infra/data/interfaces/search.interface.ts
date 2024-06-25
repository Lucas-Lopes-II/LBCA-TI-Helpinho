export type SearchProps = {
  page?: number;
  perPage?: number;
};

export type SearchResultProps<E> = {
  items: E[];
  total: number;
  currentPage: number;
  perPage: number;
  lastPage: number;
};

export class SearchParams {
  protected _perPage = 10;
  protected _page: number;

  constructor(props: SearchProps = {}) {
    this.page = props.page;
    this.perPage = props.perPage;
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
}

export class SearchResult<E> {
  public readonly items: E[];
  public readonly total: number;
  public readonly currentPage: number;
  public readonly perPage: number;
  public readonly lastPage: number;
  public readonly sort: string | null;
  public readonly sortDir: string | null;

  constructor(props: Omit<SearchResultProps<E>, 'lastPage'>) {
    this.items = props.items;
    this.total = props.total;
    this.currentPage = props.currentPage;
    this.perPage = props.perPage;
    this.lastPage = Math.ceil(this.total / this.perPage);
  }

  public toJSON(): SearchResultProps<E> {
    return {
      items: this.items,
      total: this.total,
      currentPage: this.currentPage,
      perPage: this.perPage,
      lastPage: this.lastPage,
    };
  }
}

export interface ISearchableRepository<E, SearchOutput = SearchResult<E>> {
  search(props?: SearchParams): Promise<SearchOutput>;
}
