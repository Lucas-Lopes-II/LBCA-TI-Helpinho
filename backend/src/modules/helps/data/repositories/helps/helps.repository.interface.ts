import {
  FilterIndexes,
  ICreate,
  IDelete,
  IFindById,
  ISearchableRepository,
  IUpdate,
  SearchParams,
  SearchResult,
} from '@shared/infra/data';
import { Help } from '../../entities/help';

export enum HelpsIndexes {
  ID = 'IdIndex',
  USER_HELPED_ID = 'UserHelpedIndex',
}

export enum HelpsFields {
  ID = 'id',
  USER_HELPED_ID = 'userHelped',
}

export interface IHelpsRepository
  extends ICreate<Help, void>,
    IFindById<Help>,
    IDelete,
    ISearchableRepository<Help>,
    IUpdate<Help> {
  searchByFilter(
    props: SearchParams,
    filter: FilterIndexes<HelpsIndexes, HelpsFields, string>,
  ): Promise<SearchResult<Help>>;
}
