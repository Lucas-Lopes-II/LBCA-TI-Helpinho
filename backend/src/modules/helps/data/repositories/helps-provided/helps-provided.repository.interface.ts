import {
  ICreate,
  IDelete,
  IFindById,
  IUpdate,
  SearchParams,
  SearchResult,
} from '@shared/infra/data';
import { HelpProvided } from '../../entities/help-provided';

export enum HelpsProvidedIndexes {
  ID = 'IdIndex',
  HELP_ID = 'HelpIdIndex',
  USER_HELPED_ID = 'UserRelpedIndex',
}

export enum HelpsProvidedFields {
  ID = 'id',
  HELP_ID = 'helpId',
  USER_HELPED_ID = 'userRelped',
}

export type FilterIndexes<T> = {
  index: HelpsProvidedIndexes;
  field: HelpsProvidedFields;
  value: T;
};

export interface IHelpsProvidedRepository
  extends ICreate<HelpProvided, void>,
    IFindById<HelpProvided>,
    IDelete,
    IUpdate<HelpProvided> {
  searchByFilter(
    props: SearchParams,
    filter: FilterIndexes<string>,
  ): Promise<SearchResult<HelpProvided>>;
}
