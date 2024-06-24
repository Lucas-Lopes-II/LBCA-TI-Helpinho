import {
  ICreate,
  IDelete,
  IFindById,
  ISearchableRepository,
  IUpdate,
} from '@shared/infra/data';
import { HelpProvided } from '../../entities/help-provided';

export interface IHelpsProvidedRepository
  extends ICreate<HelpProvided, void>,
    IFindById<HelpProvided>,
    IDelete,
    ISearchableRepository<HelpProvided>,
    IUpdate<HelpProvided> {}
