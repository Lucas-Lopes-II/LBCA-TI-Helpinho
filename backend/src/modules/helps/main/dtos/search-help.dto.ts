import { HelpFilteredFilds } from '@helps/data';
import { SearchProps, SortDirection } from '@shared/infra/data';

export class SearchQueryParamsDto implements SearchProps<HelpFilteredFilds> {
  page?: number;
  perPage?: number;
  sort?: string;
  sortDir?: SortDirection;
  filter?: string;
  field?: HelpFilteredFilds;
}
