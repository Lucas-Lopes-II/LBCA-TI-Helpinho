import {
  FilterIndexes,
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
  USER_HELPED_ID = 'UserHelpedIndex',
}

export enum HelpsProvidedFields {
  ID = 'id',
  HELP_ID = 'helpId',
  USER_HELPED_ID = 'userHelped',
}

export interface IHelpsProvidedRepository
  extends ICreate<HelpProvided, void>,
    IFindById<HelpProvided>,
    IDelete,
    IUpdate<HelpProvided> {
  searchByFilter(
    props: SearchParams,
    filter: FilterIndexes<HelpsProvidedIndexes, HelpsProvidedFields, string>,
  ): Promise<SearchResult<HelpProvided>>;
}
