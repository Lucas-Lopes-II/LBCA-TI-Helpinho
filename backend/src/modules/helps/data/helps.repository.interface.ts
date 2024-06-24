import {
  ICreate,
  IDelete,
  IFindById,
  ISearchableRepository,
  IUpdate,
} from '@shared/infra/data';
import { Help } from './help';

export interface IHelpsRepository
  extends ICreate<Help, void>,
    IFindById<Help>,
    IDelete,
    ISearchableRepository<Help>,
    IUpdate<Help> {}
