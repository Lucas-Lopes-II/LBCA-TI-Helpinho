import { SearchProps } from '@shared/infra/data';

export class SearchQueryParamsDTO implements SearchProps {
  page?: number;
  perPage?: number;
}
