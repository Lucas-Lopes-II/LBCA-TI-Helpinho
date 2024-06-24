import { SearchProps } from '@shared/infra/data';

export class SearchQueryParamsDto implements SearchProps {
  page?: number;
  perPage?: number;
}
