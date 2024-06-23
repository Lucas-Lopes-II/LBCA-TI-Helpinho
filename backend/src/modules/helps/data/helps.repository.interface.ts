import { Help, HelpFilteredFilds } from '@helps/data';
import {
  ICreate,
  IDelete,
  IFindById,
  ISearchableRepository,
  IUpdate,
} from '@shared/infra/data';

export interface IHelpsRepository
  extends ICreate<Help, void>,
    IFindById<Help>,
    IDelete,
    ISearchableRepository<Help, HelpFilteredFilds>,
    IUpdate<Help> {}
